from flask import Flask, request
import json
from recommender import Recommender
from flask_cors import CORS
import sys
sys.path.append("../shopbot/shortest_path/")
from dijktras_shortest_path import *
from graph import *
from item_map import *

app = Flask(__name__)

CORS(app)

@app.route('/')
def index():
    return "Flask server"

@app.route('/recommendations', methods = ['GET', 'POST'])
def postdata():
    try:
        age = request.args.get('age')
        gender = request.args.get('gender')
        month = request.args.get('month')
        number = request.args.get('number')
        print(age, gender, month, number)
        recommeds = Recommender().getNRecommendations(int(age), gender, month, int(number))
        #data = request.get_json()
        print("recommendations : ", recommeds)
        # do something with this data variable that contains the data from the node server
        return json.dumps({"recommendations":recommeds})
    except:
        return json.dumps({"recommendations":"error"})


@app.route('/shortestPath', methods = ['GET', 'POST'])
def getdata():
        currentNode = int(request.args.get('current'))
        destinationNode = int(request.args.get('destination'))
        graph = Graph(0)
        dijk = DijkstraAlgo(graph.getGraph())
        dijk.run(currentNode)
        msg = json.dumps({"shortest_path":dijk.getPath(destinationNode)})
        return msg

if __name__ == "__main__":
    app.run(host = '0.0.0.0',port=9000)
