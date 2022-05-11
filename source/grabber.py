import requests
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import decouple
from decouple import config
from datetime import datetime
#env variables
CERTLOCATION = config('CERTLOCATION')
DBLOCATION = config('DBLOCATION')
CRONMONITORING = config("CRONMONITORING")
#json
json_data = {}
#firebase
cred = credentials.Certificate(CERTLOCATION)
response = requests.get("https://api.parcility.co/db/repos")
firebase_admin.initialize_app(cred)
db = firestore.client()
#
if response.status_code == 200:
	def delete_collection(coll_ref, batch_size):
		docs = coll_ref.limit(batch_size).stream()
		deleted = 0
		for doc in docs:
			print(f'Deleting doc {doc.id} => {doc.to_dict()}')
			doc.reference.delete()
			deleted = deleted + 1
		if deleted >= batch_size:
			return delete_collection(coll_ref, batch_size)
	delete_collection(db.collection(DBLOCATION), 1000)
	print(f'Status code: {response.status_code}. Getting all repos available.')
	data = response.json()["data"]
	for each in data:
		#testing
		try:
			testrepo = each["repo"]
			reporesponse = requests.get(testrepo, timeout=5)
			print(f'reporesponse={reporesponse.status_code}')
		except:
			print('Failed repo. Skipping\n##########')
		#if valid
		if reporesponse.status_code == 200:
			#getting repo names
			try: 
				name = each["Label"]
				name = name.encode("utf-8").decode("utf-8")
				name = name.replace("\r", "")
				altname = each["id"]
				print(name)
			except: 
				name = "Name unknown"
				print(name)
			finally:
				#getting repo links
				try:
					repo = each["repo"]
					print(repo)
				except:
					repo = "Repo unknown"
					print(repo)
				finally:
					#getting repo icons
					try:
						testicon = each["Icon"]
						iconresponse = requests.get(testicon, timeout=5)
						if iconresponse.status_code == 200:
							icon = testicon
							print(f'iconresponse={iconresponse.status_code}')
						else:
							icon = "https://github.com/Wamy-Dev/Apokto/blob/main/assets/error.png?raw=true"
							print(icon)
					except:
						icon = "https://github.com/Wamy-Dev/Apokto/blob/main/assets/error.png?raw=true"
						print(f'iconresponse={iconresponse.status_code}. getting icon failed, using fallback')
					finally:
						#getting repo descriptions
						try: 
							description = each["Description"]
							description = description.encode("utf-8").decode("utf-8", "ignore")
							description = description.replace("\r", "").replace(u"\uFFFD", "").replace('"', "")
							print(description)
						except:
							description = "Description unknown"
							print(description)
						finally:
							print("done with this valid repo")
			try:
				upload = db.collection(DBLOCATION).document(name)
				upload.set({
					'repo': repo,
					'icon': icon,
					'desc': description
					}, merge=True)
				print("uploaded using original name.\n##########")
			except:
				#only if the original name is invalid for whatever reason
				upload = db.collection(DBLOCATION).document(altname)
				upload.set({
					'repo': repo,
					'icon': icon,
					'desc': description
					}, merge=True)
				print("uploaded using alt name.\n##########")
			#to json file
			json_data[name] = {}
			json_data[name] = {"repo": repo, "icon": icon, "desc": description}
		else:
			print("Failed repo, skipping.\n##########")	
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
	print("API is down.")
