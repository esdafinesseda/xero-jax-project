import os
import sklearn
import numpy as np

import joblib
from sklearn.tree import DecisionTreeClassifier

from jax_api import FraudDetails, ModelRequest

class FraudModels:
    def __init__(self):
        model_path = os.path.join(os.path.dirname(__file__), '../models/fraud_model_dt.pkl')
        self.model_dt = joblib.load(model_path)
    
    def _details_to_array(self, predict_request: ModelRequest):
        details = predict_request.fraudDetails

        return np.array([[
            details.time,
            details.type,
            details.amount,
            details.originBalance,
            details.destinationBalance,
            details.isFlaggedFraud
        ]])
    
    def predict(self, predict_request: ModelRequest):
        # Extract features from the request
        details = predict_request.fraudDetails

        # Load features into a numpy array
        array = np.array([[
            details.time,
            details.type,
            details.amount,
            details.originBalance,
            details.destinationBalance,
            details.isFlaggedFraud
        ]])

        # Call the correct model
        model = predict_request.model
    
        if model == 0: # Decision tree
            self._predict_dt(array)

    def predict_dt(self, predict_request: FraudDetails):
        np_array = self._details_to_array(predict_request)
        
        probabilities = self.model_dt.predict(np_array)

        print(probabilities)

bot = FraudModels()

bot.predict_dt()