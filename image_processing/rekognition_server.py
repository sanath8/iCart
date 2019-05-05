from flask import Flask, request
import json
from flask_cors import CORS


from main1 import MainClass1
import time
from config import config
from main import MainClass
import boto3
import subprocess
import os
import requests


app = Flask(__name__)

CORS(app)

ips = {
    "imageProcessingServer" : "192.168.1.7"
}

@app.route('/')
def index():
    return "Flask server"

@app.route('/run', methods = ['GET', 'POST'])
def getdata():
    os.system('./upload_server.sh')
    URL = "http://"+ips["imageProcessingServer"]+":9000/imageProcessing"
    # sending get request and saving the response as response object
    r = requests.get(url = URL)
    # extracting data in json format
    results = r.json()
    return json.dumps(results)


@app.route('/rerun', methods = ['GET', 'POST'])
def postdata():
    phone_number = request.args.get('phone_number')
    config.image_file_name = 'images/webcam.jpg'
    config.amazon_info['s3_bucket_name'] = 'developmentuserbucket'
    main_class1 = MainClass1()
    results = main_class1.re_run(type=MainClass.facial_analysis, mobile_number=phone_number)
    return results


if __name__ == "__main__":
    app.run(host = '0.0.0.0', port=9005)
