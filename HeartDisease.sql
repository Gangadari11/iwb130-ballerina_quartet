#CREATE DATABASE healthcare2;
#USE healthcare2;

-- CREATE TABLE heart_disease_data (
--     patient_id INT AUTO_INCREMENT PRIMARY KEY,
--     age INT NOT NULL,
--     sex TINYINT NOT NULL,
--     cp TINYINT NOT NULL,
--     trestbps INT NOT NULL,
--     chol INT NOT NULL,
--     fbs TINYINT NOT NULL,
--     restecg TINYINT NOT NULL,
--     thalach INT NOT NULL,
--     exang TINYINT NOT NULL,
--     oldpeak FLOAT NOT NULL,
--     slope TINYINT NOT NULL,
--     ca TINYINT NOT NULL,
--     thal TINYINT NOT NULL,
--     result TINYINT NOT NULL
-- );
-- INSERT INTO heart_disease_data (age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal, result) VALUES
-- (63, 1, 3, 145, 233, 1, 0, 150, 0, 2.3, 0, 0, 1, 1),
-- (67, 1, 2, 160, 286, 0, 1, 108, 1, 1.5, 1, 0, 2, 1),
-- (67, 1, 2, 120, 229, 0, 1, 129, 1, 2.6, 1, 0, 2, 1),
-- (64, 1, 2, 130, 250, 0, 1, 122, 1, 1.4, 1, 0, 2, 1),
-- (68, 1, 2, 138, 288, 0, 1, 110, 1, 2.0, 1, 0, 2, 1),
-- (57, 0, 2, 145, 229, 0, 1, 150, 0, 1.0, 1, 0, 2, 1),
-- (50, 1, 1, 140, 239, 0, 1, 150, 0, 0.8, 1, 0, 2, 1),
-- (52, 1, 1, 120, 244, 0, 1, 158, 0, 0.0, 1, 0, 2, 1),
-- (60, 0, 2, 130, 230, 0, 1, 140, 0, 1.5, 1, 0, 2, 1),
-- (58, 0, 1, 130, 245, 0, 1, 150, 0, 0.6, 1, 0, 2, 1);

CREATE TABLE user
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO user (username, email, password) VALUES
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
