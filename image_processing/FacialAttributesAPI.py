import time
import requests
import xml.etree.ElementTree
import os.path as path
class FacialAttributesAPI:
    POLL_INTERVAL = 2
    def getAPIInfo(self, api_bank):
        api_info = api_bank.provide()
        __class__.url = path.join(api_info['base_url'], 'GetImageInfo')
        __class__.api_key = api_info['api_key']
        __class__.api_secret = api_info['api_secret']
    def setImgUid(self, img_uid):
        self.img_uid = img_uid
    def run(self):
        query_int_response = 1
        result = {}
        while(query_int_response != 0):
            #run something
            print("Polling for facial attributes...")
            request_header = {'Content-Type': 'application/xml'}
            request_body_data = '''<?xml version="1.0" encoding="utf-8"?>
<ImageInfoRequestUid xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<api_key>''' + __class__.api_key + '''</api_key>
<api_secret>''' + __class__.api_secret + '''</api_secret>
<img_uid>''' + self.img_uid + '''</img_uid>
</ImageInfoRequestUid>
            '''
            response = requests.post(url=__class__.url, headers=request_header, data=request_body_data)
            xml_tree = xml.etree.ElementTree.fromstring(response.text)
            query_int_response = int(xml_tree.findall("int_response")[0].text)
            tag_element = xml_tree.findall(".//tags/TagInfo")
            for child in tag_element:
                if child[1].text == 'age' or child[1].text == 'gender':
                    tag = {
                        'confidence' : child[0].text,
                        # 'name' : child[1].text,
                        'value' : child[2].text
                    }
                    result[child[1].text] = tag
            time.sleep(__class__.POLL_INTERVAL)
        print(result)
        return result
