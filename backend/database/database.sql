CREATE DATABASE cognitiveAssessment_Database;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    age INT,
    sex VARCHAR(10),
    ethnicity VARCHAR(50),
    highest_education VARCHAR(100),
    device_information VARCHAR(50),
    handedness VARCHAR(15);
);