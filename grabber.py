import requests
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import decouple
from decouple import config

#env variables
CERTLOCATION = config('CERTLOCATION', default="./firebasecert.json")
DBLOCATION = config('DBLOCATION', default="repos")
#json
json_data = {}
#firebase
cred = credentials.Certificate(CERTLOCATION)
response = requests.get("https://api.parcility.co/db/repos")
firebase_admin.initialize_app(cred)
db = firestore.client()

#
if response.status_code == 200:
	print(f'Status code: {response.status_code}. Getting all repos available.')
	data = response.json()["data"]
	for each in data:
		try:
			name = each["Label"]
			name = name.encode("utf-8").decode("utf-8")
			name = name.replace("\r", "")
			altname = each["id"]
		except:
			#if the value cannot be found
			name = "Name unknown."
		try:
			repo = each["repo"]
		except:
			repo = "Repo unknown."
		try:
			icon = each["Icon"]
		except:
			icon = "Icon not found."
		try:
			description = each["Description"]
			description = description.encode("utf-8").decode("utf-8", "ignore")
			description = description.replace("\r", "").replace(u"\uFFFD", "").replace('"', "")
		except:
			description = "No description given."
		#firebase firestore uploading
		try:
			upload = db.collection(DBLOCATION).document(name)
			upload.set({
				'repo': repo,
				'icon': icon,
				'desc': description
				}, merge=True)
		except:
			#only if the original name is invalid for whatever reason
			upload = db.collection(DBLOCATION).document(altname)
			upload.set({
				'repo': repo,
				'icon': icon,
				'desc': description
				}, merge=True)
		#to json file
		json_data[name] = {}
		json_data[name] = {"repo": repo, "icon": icon, "desc": description}
	json_data = json.dumps(json_data)
	json_file = open("repos.json", "w")
	json_file.write(json_data)
	json_file.close()
	print('Finished process.')
else:
	print("API is down.")
