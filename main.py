from PhotoToBase64API import PhotoToBase64API
from UploadAPI import UploadAPI

file_name = ""

photoToBase64API = PhotoToBase64API('/home/puneeth/Documents/Projects/iCart/images/boy.jpeg')
base64_string = photoToBase64API.convertToBase64()
uploadAPI = UploadAPI(base64_string)
uploadAPI.run()