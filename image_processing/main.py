from PhotoToBase64API import PhotoToBase64API
from UploadAPI import UploadAPI
from FacialAttributesAPI import FacialAttributesAPI
from APIBank import APIBank
from config import config


class MainClass:
    def run(self):
        api_bank = APIBank()
        if config.environment == "development":
            photoToBase64API = PhotoToBase64API('/home/puneeth/Documents/Projects/iCart/images/boy.jpeg')
            uploadAPI = UploadAPI()
            facialAttributesAPI = FacialAttributesAPI()
            uploadAPI.getAPIInfo(api_bank)
            facialAttributesAPI.getAPIInfo(api_bank)


        elif config.environment == "production":
            photoToBase64API = PhotoToBase64API(config.image_file_name)
            uploadAPI = UploadAPI()
            facialAttributesAPI = FacialAttributesAPI()
            uploadAPI.getAPIInfo(api_bank)
            facialAttributesAPI.getAPIInfo(api_bank)

