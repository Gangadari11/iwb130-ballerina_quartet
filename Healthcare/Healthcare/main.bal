import ballerina/io;
import ballerina/http;
import ballerinax/mysql;
import ballerina/sql;

// Initialize the MySQL client
mysql:Client dbClient = check new (host = "localhost",
                                   port = 3306,
                                   database = "healthcare2",
                                   user = "root",
                                   password = "..........");

// Define the row type for the heart disease data
type HeartDiseaseRecord record {
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
    int result;
};

service /heart_disease on new http:Listener(8081) {

    resource function post addRecord(http:Caller caller, http:Request req) returns error? {
        // Log incoming request
        io:println("Received request to add record");

        // Get JSON payload from request
        json reqData = check req.getJsonPayload();
        io:println("Request Data: ", reqData.toString()); // Log the request data

        // Extract data from the JSON payload
        int age = check reqData.age;
        int sex = check reqData.sex;
        int cp = check reqData.cp;
        int trestbps = check reqData.trestbps;
        int chol = check reqData.chol;
        int fbs = check reqData.fbs;
        int restecg = check reqData.restecg;
        int thalach = check reqData.thalach;
        int exang = check reqData.exang;
        float oldpeak = check reqData.oldpeak;
        int slope = check reqData.slope;
        int ca = check reqData.ca;
        int thal = check reqData.thal;
        int resultValue = check reqData.result;

        // Log extracted values
        io:println("Extracted values - Age: ", age, ", Sex: ", sex, ", CP: ", cp);

        // Prepare the SQL query to insert the data
        sql:ParameterizedQuery insertQuery = `INSERT INTO heart_disease_data
                                        (age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal, result) 
                                        VALUES (${age}, ${sex}, ${cp}, ${trestbps}, ${chol}, ${fbs}, ${restecg}, ${thalach}, ${exang}, ${oldpeak}, ${slope}, ${ca}, ${thal}, ${resultValue})`;

        // Execute the SQL insert query
        var sqlInsertResult = dbClient->execute(insertQuery);
        if (sqlInsertResult is error) {
            // Log error message and send response to caller
            io:println("Error executing query: ", sqlInsertResult.message());
            check caller->respond("Failed to add record: " + sqlInsertResult.message());
            return;
        }

        // Send success response
        check caller->respond("Record added successfully.");
        io:println("Record added successfully");
    }


    // New resource function to get records
    resource function get getRecords(http:Caller caller) returns error? {
        // Log incoming request
        io:println("Received request to get records");

        // Prepare the SQL query to select all records
        sql:ParameterizedQuery selectQuery = `SELECT * FROM heart_disease_data`;

        // Execute the SQL select query and get the stream of results
        stream<HeartDiseaseRecord, sql:Error?> resultStream = check dbClient->query(selectQuery, HeartDiseaseRecord);

        // Create a list to hold the records
        HeartDiseaseRecord[] records = [];

        // Collect records from the stream using forEach
        var forEachResult = resultStream.forEach(function (HeartDiseaseRecord? r) {
            if (r is HeartDiseaseRecord) {
                records.push(r);
            }
        });

        // Handle the potential error from forEach
        if (forEachResult is sql:Error) {
            io:println("Error during streaming: ", forEachResult.message());
            return forEachResult; // Return the error to caller
        }

        // Send success response with records
        check caller->respond(records);
        io:println("Records retrieved successfully");
    }
        

}


//curl -X POST http://localhost:8081/heart_disease/addRecord ^
//-H "Content-Type: application/json" ^
//-d @"C:\Users\ACER\Desktop\Healthcare\Healthcare\record.json"  



//curl -X GET http://localhost:8081/heart_disease/getRecords -o C:\Users\ACER\Desktop\Healthcare\Healthcare\records_output.json
