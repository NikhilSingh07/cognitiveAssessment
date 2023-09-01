const pool = require('../database/database');

const trialModel = async (trial_date, trial_number, trial_start_timestamp, trial_end_timestamp, trial_status, user_id) => {

    try {
        const newUser = await pool.query(
            "INSERT INTO trials (trial_date, trial_number, trial_start_timestamp, trial_end_timestamp, trial_status, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [trial_date, trial_number, trial_start_timestamp, trial_end_timestamp, trial_status, user_id]
        );

        const trial_id = newUser.rows[0].trial_id;
        console.log("trial id: "+trial_id);
        return trial_id; // Return the trial_id for further use

    } catch (error) {
        // Handle the error gracefully
        console.error("Error inserting trial:", error);
        throw error; // Re-throw the error to be caught higher up in the call stack
    }
};



/*
    console.log("trial date: "+trial_date+ ", \ntrial number: "+trial_number+
                ",\ntrial start timestamp "+trial_start_timestamp+
                ",\ntrial end timestamp "+trial_end_timestamp+",\ntrial status: "+trial_status+",\nuser id: "+ user_id);

*/

module.exports = trialModel;