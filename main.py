from PhotoToBase64API import PhotoToBase64API
from UploadAPI import UploadAPI
from FacialAttributesAPI import FacialAttributesAPI
from APIBank import APIBank

file_name = ""

api_bank = APIBank()
photoToBase64API = PhotoToBase64API('/home/puneeth/Documents/Projects/iCart/images/boy.jpeg')
uploadAPI = UploadAPI()
facialAttributesAPI = FacialAttributesAPI()
uploadAPI.getAPIInfo(api_bank)
facialAttributesAPI.getAPIInfo(api_bank)



base64_string = photoToBase64API.convertToBase64()
uploadAPI.setImageBase64(base64_string)
img_uid = uploadAPI.run()
facialAttributesAPI.setImgUid(img_uid)
facialAttributesAPI.run()
