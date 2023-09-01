CREATE DATABASE cognitiveAssessment_Database;


/*users schema*/

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    dob date,
    sex VARCHAR(10),
    qualifications VARCHAR(30),
    language_profeciency VARCHAR (20),
    vision VARCHAR(10),
    handedness VARCHAR (10),
    country VARCHAR (20),
    city VARCHAR (20),
    ethnicity VARCHAR(50),
    device_information VARCHAR(30),
    disability VARCHAR(50)
);


/*trial schema*/

CREATE TABLE trials (
    trial_id SERIAL PRIMARY KEY,
    trial_date date ,
    trial_number integer,
    trial_start_timestamp time,
    trial_end_timestamp time,
    trail_status VARCHAR(15),
    user_id integer,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


/*items schema*/

CREATE TABLE items(

    item_id INTEGER PRIMARY KEY,
    item_type VARCHAR(20),
    item_size VARCHAR(10)
);

/*clicks schema*/

CREATE TABLE clicks(

	click_id SERIAL PRIMARY KEY,
	click_number INTEGER,
	click_row_position INTEGER,
	click_column_position INTEGER,
	click_timestamp time,
	user_id INTEGER,
	trial_id INTEGER,
	item_id INTEGER,
	FOREIGN KEY(user_id) REFERENCES users(user_id),
	FOREIGN KEY(trial_id) REFERENCES trials(trial_id),
	FOREIGN KEY(item_id) REFERENCES items(item_id)
);