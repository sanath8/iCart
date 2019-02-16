import requests
import xml.etree.ElementTree

class UploadAPI:
    url = 'http://www.betafaceapi.com/service.svc/UploadNewImage_File'
    api_key = 'd45fd466-51e2-4701-8da8-04351c872236'
    api_secret = '171e8465-f548-401d-b63b-caf0dc28df5f'
    def __init__(self, imageBase64):
        self.imageBase64 = imageBase64
    def run(self):
        print("Running upload API...")
        request_header = {'Content-Type' : 'application/xml'}
        request_body_data = '''<?xml version="1.0" encoding="utf-8"?>
<ImageRequestBinary xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<api_key>''' + __class__.api_key + '''</api_key>
<api_secret>''' + __class__.api_secret  + '''</api_secret>
<detection_flags></detection_flags>
<imagefile_data>''' + self.imageBase64.decode('utf-8') + '''</imagefile_data>
<original_filename>sample1.jpg</original_filename>
</ImageRequestBinary>
        '''

        print(request_body_data)
        response = requests.post(url=__class__.url, headers=request_header, data=request_body_data)
        print("This is the response")
        print(response)

        xml_tree = xml.etree.ElementTree.fromstring(response.text).getroot()
        img_uid = xml_tree.findall("img_uid")[0]
        print(img_uid)