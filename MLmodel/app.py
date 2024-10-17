from flask import Flask, request, jsonify
import joblib
import numpy as np 

app = Flask(__name__)

model= joblib.load('heartdiseasemodel.pkl')

@app.route('/predict',methods=['POST'])
def predict():
    data=request.get_json()
    # Extract individual features from the request data
    features = np.array([[ 
        data['age'],
        data['sex'],
        data['cp'],
        data['trestbps'],
        data['chol'],
        data['fbs'],
        data['restecg'],
        data['thalach'],
        data['exang'],
        data['oldpeak'],
        data['slope'],
        data['ca'],
        data['thal']
    ]])
    prediction=model.predict(features)
    return jsonify({'prediction': int(prediction[0])})

if __name__ =='__main__':
    app.run(debug=True, port=5000)