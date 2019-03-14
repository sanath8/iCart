1) Changing image file : goto rekognition_server.py and change the config.image_file_name variable to your image path

2) Starting flask server : python rekognition_server.py

3) Sending intitial request to server : 0.0.0.0:9005/run
        response if identified : {"recognized": "9008174384", "age": 34.5, "gender": "Male"}
        response if not identified : {"recognized": False}

4) Sending mobile number if not identified : 0.0.0.0:9005/rerun?phone_number=9008174383
        response : {"recognized": "9008174384", "age": 34.5, "gender": "Male"}
