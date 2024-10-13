from flask import Flask, request, jsonify
import joblib
import numpy as np 

app = Flask(__name__)

model= joblib.load('heart_disease_model.pkl')

@app.route('/predict',methods=['POST'])
def predict():
    data=request.get_json()
    features=np.array([data['features']])
    prediction=model.predict(features)
    return jsonify({'prediction': int(prediction[0])})

if __name__ =='__main__':
    app.run(debug=True, port=5000)