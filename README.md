# HeartDiseaseAPI


This repository contains the backend code for the Heart Disease Diagnosis web application. It implements a machine learning model using Flask and integrates with a Ballerina backend for diagnosis.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- RESTful API for heart disease diagnosis.
- Integrates with a machine learning model to provide predictions.
- Handles various symptoms and returns a diagnosis with confidence level.

## Technologies

- **Framework**: Flask (Python), React
- **Machine Learning**: Trained using scikit-learn
- **Data Handling**: Pandas, NumPy
- **Database**: MySQL
- **Integration**: Ballerina

## Installation

### Prerequisites

Make sure you have the following installed:

- [Python](https://www.python.org/)
- [Flask](https://flask.palletsprojects.com/en/2.0.x/)
- [Ballerina](https://ballerina.io/)
- [Nodejs](https://nodejs.org/en/download/prebuilt-installer/current)

### Step-by-Step Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Gangadari11/iwb130-ballerina_quartet.git
   cd iwb130-ballerina_quartet

2. **Frontend dependencies:**
    
    ```bash
    cd Frontend
    npm install
3. **Backend (Model) dependencies:**
   Navigate to the MLmodel directory where the machine learning API resides and install Flask and the required libraries:
   ```bash
   pip install Flask

4. **Usage**
   ```bash
   Navigate to the Frontend directory and run following commands to run the React app
   cd Frontend
   cd Model
   npm run dev

   After that navigate to the MLmodel directory to run the Flask server

   
   cd MLmodel
   python app.py

   Then the Flask server should start running on http:localhost/5000

   Navigate to the Healthcare directory

   cd Healthcare
   cd Healthcare
   bal build
   bal run

   If you find any unresolved modules pull them manually.

Using the above commands you'll be able to setup the project.

   

   


   

If your project requires specific Python libraries for machine learning, ensure you have a requirements.txt file in the Model directory. Create a requirements.txt file with the following contents:

txt
Copy code
Flask
scikit-learn
pandas
numpy
Then, run the following command to install all dependencies:

bash
Copy code
pip install -r requirements.txt
Usage
To run the web application, follow these steps:

Start the backend Flask server:

bash
Copy code
cd Model
flask run
Start the Ballerina backend: Ensure your Ballerina backend is set up, then start it using:

bash
Copy code
ballerina run main.bal
Run the frontend:

bash
Copy code
cd Frontend
npm start
Once all the servers are running, you can access the application via the frontend.

API Documentation
To access the heart disease diagnosis API, send a POST request to the Flask server with the relevant symptoms. The API will respond with a diagnosis and confidence level.
