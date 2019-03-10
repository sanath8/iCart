from sklearn.externals import joblib
import numpy as np
from sklearn.preprocessing import LabelEncoder
from config import *

class Recommender:
    def __init__(self):
        self.model = joblib.load(config.model_path)

        self.encoder_gender = LabelEncoder()
        self.encoder_gender.classes_ = np.load(config.encoder_gender)

        self.encoder_shopping_month = LabelEncoder()
        self.encoder_shopping_month.classes_ = np.load(config.encoder_shopping_month)

    def getRecommendation(self, age, gender, month):
        return(self.model.predict(np.array([[age,self.encoder_gender.transform([gender]), self.encoder_shopping_month.transform([month])]])))

    def getNRecommendations(self, age, gender, month, N):
        preds = self.model.predict_proba(np.array([[age,self.encoder_gender.transform([gender]), self.encoder_shopping_month.transform([month])]])).tolist()[0]
        print(preds)
        classes = list(self.model.classes_)
        maxi = 0
        max_index = 0
        added = []
        for i in range(N):
            maxi = 0
            for j in range(len(classes)):
                if((preds[j] > maxi) and (classes[j] not in added)):
                    maxi = preds[j]
                    max_index = j
            added.append(classes[max_index])

        return added




print(Recommender().getNRecommendations(43, "female", "october", 4))
