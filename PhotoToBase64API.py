import base64
class PhotoToBase64API:
    def __init__(self, photoPath):
        '''photoPath is the absolute local filepath of the image which is to be converted to base64.
        '''
        self.photoPath = photoPath
    def convertToBase64(self):
        with open(self.photoPath, 'rb') as photo:
            encoded_string_b64 = base64.b64encode(photo.read())
        return encoded_string_b64
