import ballerinax/mysql;

// Define configurable variables for the database connection
configurable string DB_HOST = ?;
configurable int DB_PORT = 3306;
configurable string DB_NAME = ?;
configurable string DB_USER = ?;
configurable string DB_PASSWORD = ?;

// Initialize the MySQL client using the configurable variables
public mysql:Client dbClient = check new (host = DB_HOST,
                                   port = DB_PORT,
                                   database = DB_NAME,
                                   user = DB_USER,
                                   password = DB_PASSWORD);