import requests
import xml.etree.ElementTree
import os.path as path

class UploadAPI:
    def getAPIInfo(self, api_bank):
        api_info = api_bank.provide()
        # print(api_info)
        __class__.url = path.join(api_info['base_url'], 'UploadNewImage_File')
        __class__.api_key = api_info['api_key']
        __class__.api_secret = api_info['api_secret']
    def setImageBase64(self, imageBase64):
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

        # print(request_body_data)
        # print(__class__.url)
        response = requests.post(url=__class__.url, headers=request_header, data=request_body_data)
        # print("This is the response")
        # print(response.text)

        xml_tree = xml.etree.ElementTree.fromstring(response.text)
        img_uid_element = xml_tree.findall("img_uid")[0]
        # print(img_uid.text)
        return img_uid_element.text