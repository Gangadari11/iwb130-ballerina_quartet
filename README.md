# CardioInsight


This repository contains the backend code for the Heart Disease Diagnosis web application. It implements a machine learning model using Flask and integrates with a Ballerina backend for diagnosis.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)


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
   Navigate to the Healthcare directory

   cd Healthcare
   cd Healthcare
   bal build
   bal run
   
   Navigate to the Frontend directory and run following commands to run the React app
   cd Frontend
   cd Model
   npm run dev

   After that navigate to the MLmodel directory to run the Flask server
   cd MLmodel
   python app.py

   Then the Flask server should start running on http:localhost/5000

   

   If you find any unresolved modules pull them manually.

Using the above commands you'll be able to setup the project and execute the application


      

   


   

