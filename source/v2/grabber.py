import requests
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import random
from decouple import config
from datetime import datetime
import string
from git import Repo
import os
import shutil

#env variables
CRONMONITORING = config("CRONMONITORING")
#firestore
cred = credentials.Certificate("./creds.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
def delete_collection(coll_ref, batch_size):
		docs = coll_ref.limit(batch_size).stream()
		deleted = 0
		for doc in docs:
			print('Deleting previous docs... please wait.')
			doc.reference.delete()
			deleted = deleted + 1
		if deleted >= batch_size:
			return delete_collection(coll_ref, batch_size)
response = requests.get("https://api.canister.me/v2/")
if response.status_code == 200:
    delete_collection(db.collection("repos"), 1000)
    list = []
    if os.path.isdir('./sources'):   
        for f in os.listdir("./sources/configs/index-list/"):
            list.append(f[:-5])
    else:
        Repo.clone_from("https://github.com/cnstr/manifests.git", "./sources")
        for f in os.listdir("./sources/configs/index-list/"):
            list.append(f[:-5])
    print("Repos total:",len(list))
    current = 0
    #now request for each
    for r in list:
        repodata = requests.get(f"https://api.canister.me/v2/jailbreak/repository/search?q={r}")
        repodata = repodata.content
        data = json.loads(repodata)
        total = len(list)
        try:
            if data["status"] == "200 OK" and data["data"][0]["name"]:
                current+=1
                N = 10
                ID = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(N))
                name = data["data"][0]["name"]
                namelower = name.lower()
                description = data["data"][0]["description"]
                url = data["data"][0]["uri"]
                urltest = requests.get(url, timeout=3)
                if urltest.ok:
                    url = data["data"][0]["uri"]
                else:
                    print(f"### {name} is a bad repo. Skipping ###")
                    continue
                repoicon = f"{url}/CydiaIcon.png"
                repoicontest = requests.get(repoicon, timeout=3)
                if repoicontest.ok:
                    repoicon = f"{url}/CydiaIcon.png"
                else:
                    repoicon = "https://github.com/Wamy-Dev/Apokto/blob/main/assets/error.png?raw=true"
                #now upload to firebase
                try:
                    upload = db.collection("repos").document(name)
                    upload.set({
                        "id": ID,
                        "name": namelower,
                        "repo": url,
                        "icon": repoicon,
                        "desc": description,
                        "number": current
                    }, merge=True)
                    print(f"### Uploaded {name} to database ###")
                except:
                    print(f"### {name} is a bad repo. Skipping ###")
            else:
                print(f"### {name} is a bad repo. Skipping ###")
        except:
            print("### Bad repo. Skipping ###") 
    #custom repos
    def ApoktoCustom(current):
        current += 1
        N = 10
        ID = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(N))
        uploadApokto = db.collection("repos").document("Apokto")
        uploadApokto.set({
            'id': ID,
            'name': "apokto",
            'repo': "https://repo.apokto.one",
            'icon': "https://repo.apokto.one/CydiaIcon.png",
            'desc': "The best repo for other repos",
            "number": current
            }, merge=True)
        print("### Uploaded Apokto to database ###")
    ApoktoCustom(current)
    #delete sources file
    shutil.rmtree("./sources") 
    try:
        now=datetime.now()
        current_time = now.strftime("%H:%M:%S")
        requests.post(CRONMONITORING, data=f'Time finished: {current_time}.')
    except requests.RequestException as e:
        print("Ping failed: %s" % e)
    print(f'Finished process at {current_time}')
else:
    print("### Canister.me is down. Exiting... ###")

