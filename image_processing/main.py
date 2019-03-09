from image_processing.PhotoToBase64API import PhotoToBase64API
from image_processing.UploadAPI import UploadAPI
from image_processing.FacialAttributesAPI import FacialAttributesAPI
from image_processing.APIBank import APIBank
from image_processing.config import config
import boto3

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

class MainClass:
    face_recognition = 1
    facial_analysis = 2
    def __init__(self):

        self.client = boto3.client('rekognition')
        self.s3_resource = boto3.resource('s3')
        # self.create_collection("stranger_collection")

    def create_collection(self, collection_id):
        response = self.client.create_collection(CollectionId=collection_id)
        if response['StatusCode'] == 200:
            print("New collection with id " + collection_id + "created successfully")
        else :
            print("There was a problem")

    def upload_file_to_s3(self, file_name, file_key):
        '''

        :param file_name: the system specific path of the file
        :return: nothing
        '''
        self.s3_resource.meta.client.upload_file(
            Filename=config.image_file_name, Bucket=config.amazon_info['s3_bucket_name'],
            Key=file_key)

    def index_faces(self, collection_id, photo, bucket):
        response = self.client.index_faces(CollectionId=collection_id,
                                      Image={'S3Object': {'Bucket': bucket, 'Name': photo}},
                                      ExternalImageId=photo,
                                      MaxFaces=1,
                                      QualityFilter="AUTO",
                                      DetectionAttributes=['ALL'])
        #collection only the 1st image
        self.face_id = response['FaceRecords'][0]['Face']['FaceId']
        print("face id is " + self.face_id)


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
            try:
                response = self.client.search_faces(CollectionId=collection_id,
                                           FaceId=self.face_id,
                                           FaceMatchThreshold=config.search_faces['threshold'],
                                           MaxFaces=config.search_faces['maxFaces'])
                faceMatches = response['FaceMatches']
                print("face Matches for collection id " + collection_id + " " + faceMatches)
                if len(faceMatches) != 0:
                    match_collection_ids.append(collection_id)
            except Exception:
                print("Exception occured")

            #place this face photo into the respective collection
        #ideally the length of match_collection_ids should be 1 however if it is not we select the first one of them
        #place the photo from stranger collection to this collection and remove the photo from the stranger collection
        if len(match_collection_ids) > 1:
            selected_collection_id = match_collection_ids[0]
            if match_collection_ids[0] == 'stranger_collection':
                selected_collection_id = match_collection_ids[1]
            print("Deleting from stranger collection")
            self.client.delete_faces(CollectionId='stranger_collection',
                                     FaceIds=[self.face_id])
            print("replacing the photo to collection_id" + collection_id)
            self.index_faces(selected_collection_id, config.image_file_name.split('/')[-1], config.amazon_info['s3_bucket_name'])
        elif len(match_collection_ids) == 1:
            if match_collection_ids[0] != 'stranger_collection':
                self.client.delete_faces(CollectionId='stranger_collection',
                                    FaceIds=[self.face_id])
                self.index_faces(match_collection_ids[0], config.image_file_name.split('/')[-1], config.amazon_info['s3_bucket_name'])
            else:
                print("Creating a new collection from phone number")
                #create the collection with id mobileNumber
                self.create_collection(config.user_info['mobile_number'])
                self.index_faces(config.user_info['mobile_number'], config.image_file_name.split('/')[-1],
                                 config.amazon_info['s3_bucket_name'])
        elif len(match_collection_ids) == 0:
            print("Entered here")
            print("Creating a new collection from phone number")
            # create the collection with id mobileNumber
            self.create_collection(config.user_info['mobile_number'])
            self.index_faces(config.user_info['mobile_number'], config.image_file_name.split('/')[-1],
                             config.amazon_info['s3_bucket_name'])

        # response = self.client.detect_faces(Image={'S3Object': {'Bucket': config.amazon_info['s3_bucket_name'], 'Name': config.image_file_name.split('/')[-1]}}, Attributes=['ALL'])
        # approx_age = (response['FaceDetails'][0]['AgeRange']['Low'] + response['FaceDetails'][0]['AgeRange']['High']) / 2
        # print("approximate age is " + str(approx_age))
        # print("the gender is " + str(response['FaceDetails'][0]['Gender']))




config.image_file_name = '/home/puneeth/Documents/Projects/iCart/image_processing/images/lomachenko.jpg'
config.amazon_info['s3_bucket_name'] = 'developmentuserbucket'
main_class = MainClass()
main_class.run(type=MainClass.facial_analysis)