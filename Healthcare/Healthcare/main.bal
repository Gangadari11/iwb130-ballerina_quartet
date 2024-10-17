import ballerina/io;
import ballerina/http;
import ballerinax/mysql;
import ballerina/sql;
import ballerina/crypto;

// Define configurable variables
configurable string DB_HOST = ?;
configurable int DB_PORT = ?;
configurable string DB_NAME = ?;
configurable string DB_USER = ?;
configurable string DB_PASSWORD = ?;
configurable string FLASK_SERVICE_URL = ?;

// Initialize the MySQL client using the configurable variables
mysql:Client dbClient = check new (host = DB_HOST,
                                   port = DB_PORT,
                                   database = DB_NAME,
                                   user = DB_USER,
                                   password = DB_PASSWORD);
// Define the row type for the heart disease data
type HeartDiseaseRecord record {
    int patient_id;
    int age;
    int sex;
    int cp;
    int trestbps;
    int chol;
    int fbs;
    int restecg;
    int thalach;
    int exang;
    float oldpeak;
    int slope;
    int ca;
    int thal;
    int target;
};

// Define the request structure for prediction
type PredictionRequest record {
    int age;
    int sex;
    int cp;
    int trestbps;
    int chol;
    int fbs;
    int restecg;
    int thalach;
    int exang;
    float oldpeak;
    int slope;
    int ca;
    int thal;
};

type UserRecord record{
    string username;
    string name;
    string email; 
    string passwordHash; // Hashed password
};


service /heart_disease on new http:Listener(8081){
    // Resource to get prediction from Flask service and add record to the database
    resource function post predictAndAddRecord(http:Caller caller, http:Request req) returns error?{
        // Log incoming request
        io:println("Received request for prediction and adding record");

        // Get JSON payload from request
        json reqData = check req.getJsonPayload();


        io:println("Prediction Request Data: ", reqData.toString()); // Log the request data

        // Extract the first 13 attributes to send to the Flask model
        PredictionRequest predictionRequest = {
            age: check reqData.age,
            sex: check reqData.sex,
            cp: check reqData.cp,
            trestbps: check reqData.trestbps,
            chol: check reqData.chol,
            fbs: check reqData.fbs,
            restecg: check reqData.restecg,
            thalach: check reqData.thalach,
            exang: check reqData.exang,
            oldpeak: check reqData.oldpeak,
            slope: check reqData.slope,
            ca: check reqData.ca,
            thal: check reqData.thal
        };
        // Send the extracted data to Flask service for prediction
        http:Client flaskClient = check new (FLASK_SERVICE_URL);
        http:Response flaskResponse = check flaskClient->post("/predict", predictionRequest);

        // Get the prediction from the Flask response
        json predictionResult = check flaskResponse.getJsonPayload();
        int prediction = check predictionResult.prediction; // Extract prediction from response

        io:println("Prediction Result: ", prediction);

        // Add the record along with the prediction result to the database
        sql:ParameterizedQuery insertQuery = `INSERT INTO heart_disease_data
                                            (age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal, result)
                                            VALUES (${predictionRequest.age}, ${predictionRequest.sex}, ${predictionRequest.cp}, 
                                                    ${predictionRequest.trestbps}, ${predictionRequest.chol}, ${predictionRequest.fbs}, 
                                                    ${predictionRequest.restecg}, ${predictionRequest.thalach}, ${predictionRequest.exang}, 
                                                    ${predictionRequest.oldpeak}, ${predictionRequest.slope}, ${predictionRequest.ca}, 
                                                    ${predictionRequest.thal}, ${prediction})`;


        // Execute the SQL insert query
        var sqlInsertResult = dbClient->execute(insertQuery);
        if (sqlInsertResult is error) {
            io:println("Error executing query: ", sqlInsertResult.message());
            check caller->respond("Failed to add record: " + sqlInsertResult.message());
            return;
        }

        // Send success response with the prediction result
        check caller->respond({"message": "Record added successfully", "prediction": prediction});
        io:println("Record added successfully with prediction: ", prediction);
    }
    // Resource to get all heart disease records

    resource function get getRecords(http:Caller caller) returns error? {
    // Log incoming request
    io:println("Received request to get records");

    // Prepare the SQL query to select all records
    sql:ParameterizedQuery selectQuery = `SELECT * FROM heart_disease_data`;

    // Execute the SQL select query and get the stream of results
    stream<HeartDiseaseRecord, sql:Error?> resultStream = dbClient->query(selectQuery, HeartDiseaseRecord);

    // Create a list to hold the records
    HeartDiseaseRecord[] records = [];

    // Collect records from the stream using forEach
    var forEachResult = resultStream.forEach(function (HeartDiseaseRecord? r) {
        if (r is HeartDiseaseRecord) {
            records.push(r);
        }
    });

    // Handle potential error during streaming
    if (forEachResult is sql:Error) {
        io:println("Error during streaming: ", forEachResult.message());
        // Respond with error message to the caller
        var errorResponse = caller->respond("Error occurred while retrieving records: " + forEachResult.message());
        if (errorResponse is error) {
            io:println("Error sending response: ", errorResponse.message());
        }
        return forEachResult; // Return the error to caller
    }

    // Send the records as the response
    var response = caller->respond(records);
    if (response is error) {
        io:println("Error sending response: ", response.message());
    } else {
        io:println("Records retrieved successfully");
    }
}

resource function get getRecordById(http:Caller caller, int patientId) returns error? {
    // Prepare the SQL query to select a record by patient ID
    sql:ParameterizedQuery selectQuery = `SELECT * FROM heart_disease_data WHERE id = ${patientId}`;

    // Execute the query and get a stream of results
    stream<HeartDiseaseRecord, sql:Error?> resultStream = dbClient->query(selectQuery, HeartDiseaseRecord);

    // Use a variable to store the found record
    HeartDiseaseRecord? foundrecord = null;

    // Process the stream to find the first record
    var forEachResult = resultStream.forEach(function (HeartDiseaseRecord? r) {
        if (r is HeartDiseaseRecord) {
            foundrecord = r; // Store the record if found
        }
    });

    // Check for any streaming errors
    if (forEachResult is sql:Error) {
        return caller->respond("Error retrieving record: " + forEachResult.message());
    }

    // Check if a record was found
    if (foundrecord is HeartDiseaseRecord) {
        // Send the found record as the response
        return caller->respond(foundrecord);
    } else {
        // Send a not found response if no record was found
        return caller->respond("No record found for Patient ID: " + patientId.toString());
    }
}




}

// Authentication service
service /auth on new http:Listener(8080) {
    // Resource for user signup
    resource function post signup(http:Caller caller, http:Request req) returns error? {
        json|error reqData = req.getJsonPayload();
        
        if reqData is error {
            return caller->respond({status: "error", message: "Invalid JSON payload"});
        }
        
        string username = check reqData.username.ensureType(string);
        string name = check reqData.name.ensureType(string);
        string email = check reqData.email.ensureType(string);
        string password = check reqData.password.ensureType(string);
        
        string passwordHash = crypto:hashSha256(password.toBytes()).toBase16();
        
        sql:ParameterizedQuery insertQuery = `INSERT INTO users (username, name, email, password_hash)
                                              VALUES (${username}, ${name}, ${email}, ${passwordHash})`;
        
        sql:ExecutionResult|sql:Error sqlInsertResult = check dbClient->execute(insertQuery);
        
        if sqlInsertResult is sql:Error {
            io:println("Error executing query: ", sqlInsertResult.message());
            return caller->respond({status: "error", message: "Failed to signup: Database error"});
        }
        
        check caller->respond({status: "success", message: "Signup successful"});
        io:println("User signed up successfully");
    }

    // Resource for user login
    resource function post login(http:Caller caller, http:Request req) returns error? {
        json|error reqData = req.getJsonPayload();
        
        if reqData is error {
            return caller->respond({status: "error", message: "Invalid JSON payload"});
        }
        
        string username = check reqData.username.ensureType(string);
        string password = check reqData.password.ensureType(string);
        
        sql:ParameterizedQuery selectQuery = `SELECT * FROM users WHERE username = ${username}`;
        
        stream<UserRecord, sql:Error?> resultStream = dbClient->query(selectQuery);
        
        record {|UserRecord value;|}? result = check resultStream.next();
        check resultStream.close();
        
        if result is () {
            return caller->respond({status: "error", message: "Invalid username or password"});
        }
        
        UserRecord user = result.value;
        string hashedInputPassword = crypto:hashSha256(password.toBytes()).toBase16();
        
        if user.passwordHash == hashedInputPassword {
            check caller->respond({status: "success", message: "Login successful", email: user.email});
            io:println("User logged in successfully");
        } else {
            check caller->respond({status: "error", message: "Invalid username or password"});
        }
    }
}

//************************************************************Add records using this command
//curl -X POST http://localhost:8081/heart_disease/addRecord ^
//-H "Content-Type: application/json" ^
//-d @"C:\Users\ACER\Desktop\Healthcare\Healthcare\record.json"  


//**********************************Retrieve data using this command
//curl -X GET http://localhost:8081/heart_disease/getRecords -o C:\Users\ACER\Desktop\Healthcare\Healthcare\records_output.json
