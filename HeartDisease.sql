
#USE heartDiseaseAPI;

CREATE TABLE heart_disease_data (
    patient_id INT PRIMARY KEY,
    age INT,
    sex INT,
    cp INT,
    trestbps INT,
    chol INT,
    fbs INT,
    restecg INT,
    thalach INT,
    exang INT,
    oldpeak FLOAT,
    slope INT,
    ca INT,
    thal INT,
    result INT
);


CREATE TABLE user
 (
     id INT AUTO_INCREMENT PRIMARY KEY,
     username VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     password VARCHAR(255) NOT NULL,
     name VARCHAR(45) NOT NULL
);

 INSERT INTO user (username, email, password ) VALUES
 ('user1', 'user1@example.com', 'password123'),
 ('user2', 'user2@example.com', 'qwerty456'),
 ('user3', 'user3@example.com', 'abcdef789'),
 ('user4', 'user4@example.com', 'pass1234'),
 ('user5', 'user5@example.com', 'secret567'),
 ('user6', 'user6@example.com', 'letmein890'),
 ('user7', 'user7@example.com', '12345password'),
 ('user8', 'user8@example.com', 'mypassword321'),
 ('user9', 'user9@example.com', 'helloWorld!234'),
 ('user10', 'user10@example.com', 'welcome987');
