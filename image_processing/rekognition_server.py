from flask import Flask, request
import json
from flask_cors import CORS


from main1 import MainClass1
import time
from config import config
from main import MainClass
import boto3


app = Flask(__name__)

CORS(app)

@app.route('/')
def index():
    return "Flask server"

@app.route('/run', methods = ['GET', 'POST'])
def getdata():
    config.image_file_name = 'images/saj.png'
    config.amazon_info['s3_bucket_name'] = 'developmentuserbucket'
    main_class1 = MainClass1()
    results = main_class1.run(type=MainClass.facial_analysis)
    return results


@app.route('/rerun', methods = ['GET', 'POST'])
def postdata():
    phone_number = request.args.get('phone_number')
    config.image_file_name = 'images/saj.png'
    config.amazon_info['s3_bucket_name'] = 'developmentuserbucket'
    main_class1 = MainClass1()
    results = main_class1.re_run(type=MainClass.facial_analysis, mobile_number=phone_number)
    return results


if __name__ == "__main__":
    app.run(host = '0.0.0.0', port=9005)
