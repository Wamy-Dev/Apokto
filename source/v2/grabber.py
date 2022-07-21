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

response = requests.get("https://api.canister.me/v1/")
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
    #now request for each
    for r in list:
        repodata = requests.get(f"https://api.canister.me/v1/community/repositories/search?query={r}&responseFields=name,description,uri")
        decodedrepodata = repodata.content.decode()
        data = json.loads(decodedrepodata)
        if data["status"] == "Successful":
            N = 10
            ID = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(N))
            name = data["data"][0]["name"]
            namelower = name.lower()
            description = data["data"][0]["description"]
            url = data["data"][0]["uri"]
            repoicon = f"{url}/CydiaIcon.png"
            #now upload to firebase
            upload = db.collection("repos").document(name)
            upload.set({
					"id": ID,
					"name": namelower,
					"repo": url,
					"icon": repoicon,
					"descirption": description
					}, merge=True)
            print(f"### Uploaded {name} to database ###")
        else:
            print("### Bad repo. Skipping ###")
    try:
        now=datetime.now()
        current_time = now.strftime("%H:%M:%S")
        requests.post(CRONMONITORING, data=f'Time finished: {current_time}.')
    except requests.RequestException as e:
        print("Ping failed: %s" % e)
    print(f'Finished process at {current_time}')
else:
    print("### Canister.me is down. Exiting... ###")

