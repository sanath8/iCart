import time
from config import config
from main import MainClass
import boto3
import json

def create_bucket(bucket_prefix, s3_connection):
    session = boto3.session.Session()
    current_region = session.region_name
    bucket_name = boto3.create_bucket_name(bucket_prefix)
    bucket_response = s3_connection.create_bucket(
        Bucket=bucket_name,
        CreateBucketConfiguration={
        'LocationConstraint': current_region})
    print(bucket_name, current_region)
    return bucket_name, bucket_response

class MainClass1(MainClass):

    def get_phone_number_from_front_end(self):
        #make a GET request to get phone number from the front end
        return json.dumps({"recognized":False})

    def send_phone_number_to_front_end(self, phone_number):
        pass

    def update_age_and_gender(self, phone_number, age, gender):
        return json.dumps({"recognized" : phone_number,
                            "age" : age,
                            "gender" : gender})


    def run(self, type):

        self.upload_file_to_s3(config.image_file_name, config.image_file_name.split('/')[-1])# customize this to give key name

        self.index_faces("stranger_collection", config.image_file_name.split('/')[-1], config.amazon_info['s3_bucket_name'])

        #calling the face recognition api
        #creating collection if it doesnt exist already
        response_recognition = self.client.list_collections(MaxResults=config.number_of_users)
        response_collection_ids = response_recognition['CollectionIds']
        match_collection_ids = []
        print("response collection ids" + str(response_collection_ids))
        for collection_id in response_collection_ids:
            # try:
            response = self.client.search_faces_by_image(CollectionId=collection_id,
                                           Image={'S3Object':{'Bucket':config.amazon_info['s3_bucket_name'],'Name':config.image_file_name.split('/')[-1]}},
                                           FaceMatchThreshold=config.search_faces['threshold'],
                                           MaxFaces=config.search_faces['maxFaces'])
            faceMatches = response['FaceMatches']
            print("face Matches for collection id " + collection_id + " " + str(faceMatches))
            if len(faceMatches) != 0:
                match_collection_ids.append(collection_id)
            # except Exception:
            #     print("Exception occured ")

            #place this face photo into the respective collection
        #ideally the length of match_collection_ids should be 1 however if it is not we select the first one of them
        #place the photo from stranger collection to this collection and remove the photo from the stranger collection
        selected_collection_id = ''
        if len(match_collection_ids) > 1:
            selected_collection_id = match_collection_ids[0]
            if match_collection_ids[0] == 'stranger_collection':
                selected_collection_id = match_collection_ids[1]
            print("face recognized with phone number " + selected_collection_id)

            print("Deleting from stranger collection")
            self.client.delete_faces(CollectionId='stranger_collection',
                                     FaceIds=[self.face_id])
            print("replacing the photo to collection_id" + selected_collection_id)
            self.index_faces(selected_collection_id, config.image_file_name.split('/')[-1], config.amazon_info['s3_bucket_name'])
        elif len(match_collection_ids) == 1:
            if match_collection_ids[0] != 'stranger_collection':
                self.client.delete_faces(CollectionId='stranger_collection',
                                    FaceIds=[self.face_id])
                selected_collection_id = match_collection_ids[0]
                self.index_faces(match_collection_ids[0], config.image_file_name.split('/')[-1], config.amazon_info['s3_bucket_name'])
            else:
                print("Creating a new collection from phone number")
                #create the collection with id mobileNumber
                return self.get_phone_number_from_front_end()
        elif len(match_collection_ids) == 0:
            print("Entered here")
            print("Creating a new collection from phone number")
            # create the collection with id mobileNumber
            return self.get_phone_number_from_front_end()

        response = self.client.detect_faces(Image={'S3Object': {'Bucket': config.amazon_info['s3_bucket_name'],
                                                                'Name': config.image_file_name.split('/')[-1]}},
                                            Attributes=['ALL'])
        approx_age = (response['FaceDetails'][0]['AgeRange']['Low'] + response['FaceDetails'][0]['AgeRange'][
            'High']) / 2
        gender = response['FaceDetails'][0]['Gender']['Value']

        if selected_collection_id != '':
            self.send_phone_number_to_front_end(selected_collection_id)
            return self.update_age_and_gender(selected_collection_id, approx_age, gender)
            #this means face is recognised





    def re_run(self, type, mobile_number):
        config.user_info['mobile_number'] = mobile_number
        self.create_collection(config.user_info['mobile_number'])
        self.index_faces(config.user_info['mobile_number'], config.image_file_name.split('/')[-1],
                         config.amazon_info['s3_bucket_name'])

        response = self.client.detect_faces(Image={'S3Object': {'Bucket': config.amazon_info['s3_bucket_name'],
                                                                'Name': config.image_file_name.split('/')[-1]}},
                                            Attributes=['ALL'])
        approx_age = (response['FaceDetails'][0]['AgeRange']['Low'] + response['FaceDetails'][0]['AgeRange'][
            'High']) / 2
        gender = response['FaceDetails'][0]['Gender']['Value']

        self.send_phone_number_to_front_end(config.user_info['mobile_number'])
        return self.update_age_and_gender(config.user_info['mobile_number'], approx_age, gender)
        #TODO when a new user has logged in
