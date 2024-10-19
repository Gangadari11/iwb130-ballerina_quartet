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

2. **Install dependencies:**
    Frontend dependencies:
bash
Copy code
cd Frontend
npm install
Backend (Model) dependencies: Navigate to the Model directory where the machine learning API resides and install Flask and the required libraries:

bash
Copy code
cd Model
pip install Flask
Additional dependencies:

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
