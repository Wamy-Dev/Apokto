import requests
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import random
from decouple import config
from datetime import datetime
import string
#env variables
CRONMONITORING = config("CRONMONITORING")
#json
json_data = {}
#firebase
cred = credentials.Certificate("./creds.json")
response = requests.get("https://api.parcility.co/db/repos")
firebase_admin.initialize_app(cred)
db = firestore.client()
#
if response.status_code == 200:
	def delete_collection(coll_ref, batch_size):
		docs = coll_ref.limit(batch_size).stream()
		deleted = 0
		for doc in docs:
			print('Deleting previous docs... please wait.')
			doc.reference.delete()
			deleted = deleted + 1
		if deleted >= batch_size:
			return delete_collection(coll_ref, batch_size)
	delete_collection(db.collection("repos"), 1000)
	print(f'Parcility status: {response.status_code}. Getting all repos available.')
	data = response.json()["data"]
	for each in data:
		N = 10#sets to a 10 digit random string
		ID = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(N))
		#testing
		try:
			testrepo = each["repo"]
			reporesponse = requests.get(testrepo, timeout=5)
			print(f'Repo Status={reporesponse.status_code}')
		except:
			print(f'Repo Status={reporesponse.status_code}. Skipping\n##########')
		#if valid
		if reporesponse.status_code == 200:
			#getting repo names
			try: 
				name = each["Label"]
				namelower = name.lower()
				name = name.encode("utf-8").decode("utf-8")
				name = name.replace("\r", "")
				altname = each["id"]
				altnameupper = altname.capitalize()
				altnamelower = altname.lower()
				print(name)
			except:
				name = "Name Unknown"
			finally:
				#getting repo links
				try:
					repo = each["repo"]
				except:
					repo = "Repo Unknown"
				finally:
					#getting repo icons
					try:
						testicon = each["Icon"]
						iconresponse = requests.get(testicon, timeout=5)
						if iconresponse.status_code == 200:
							icon = testicon
							print(f'Icon Status={iconresponse.status_code}. Using provided icon.')
						else:
							icon = "https://github.com/Wamy-Dev/Apokto/blob/main/assets/error.png?raw=true"
							print(f'Icon Status={iconresponse.status_code}. Failed, using default icon.')
					except:
						icon = "https://github.com/Wamy-Dev/Apokto/blob/main/assets/error.png?raw=true"
						print(f'Icon Status={iconresponse.status_code}. Failed, using default icon.')
					finally:
						#getting repo descriptions
						try: 
							description = each["Description"]
							description = description.encode("utf-8").decode("utf-8", "ignore")
							description = description.replace("\r", "").replace(u"\uFFFD", "").replace('"', "")
						except:
							description = "Description Unknown"
						finally:
							print("Finished valid repo.")
			try:
				upload = db.collection("repos").document(name)
				upload.set({
					'id': ID,
					"name": namelower,
					'repo': repo,
					'icon': icon,
					'desc': description
					}, merge=True)
				print("Added repo to db using default name.\n##########")
			except:
				#only if the original name is invalid for whatever reason
				upload = db.collection("repos").document(altname)
				upload.set({
					'id': ID,
					"name": altnamelower,
					'repo': repo,
					'icon': icon,
					'desc': description
					}, merge=True)
				print("Added repo to db using alternate name.\n##########")
			#to json file
			json_data[name or altname] = {}
			json_data[name or altname] = {"repo": repo, "icon": icon, "desc": description, "id": ID}
		else:
			print(f'Repo Status={reporesponse.status_code}. Skipping\n##########')	
	#custom repos
	def HavocCustom():
		N = 10#sets to a 10 digit random string
		ID = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(N))
		uploadHavoc = db.collection("repos").document("Havoc")
		uploadHavoc.set({
				'id': ID,
				"name": "havoc",
				'repo': "https://havoc.app",
				'icon': "https://havoc.app/CydiaIcon.png",
				'desc': "Havoc repository"
			}, merge=True)
		print("Added repo to db using default name.\n##########")
	def ApoktoCustom():
		N = 10#sets to a 10 digit random string
		ID = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(N))
		uploadHavoc = db.collection("repos").document("Havoc")
		uploadHavoc.set({
				'id': ID,
				"name": "apokto",
				'repo': "https://repo.apokto.one",
				'icon': "https://repo.apokto.one/CydiaIcon.png",
				'desc': "The best repo for other repos"
			}, merge=True)
		print("Added repo to db using default name.\n##########")
	HavocCustom()
	ApoktoCustom()
	json_data = json.dumps(json_data)
	json_file = open("repos.json", "w")
	json_file.write(json_data)
	json_file.close()
	print('Finished process.')
	try:
		now=datetime.now()
		current_time = now.strftime("%H:%M:%S")
		requests.post(CRONMONITORING, data=f'Time finished: {current_time}.')
	except requests.RequestException as e:
		print("Ping failed: %s" % e)
else:
	print("api.parcility.co is down.")
