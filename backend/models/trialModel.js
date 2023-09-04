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


const updateTrialModel = async (trial_id, trial_date, trial_number, trial_end_timestamp, trial_status, user_id) => {

    //console.log("trial_id: "+trial_id, " user_id: "+user_id);
    try {
        const result = await pool.query(

            "UPDATE trials SET trial_end_timestamp = $1, trial_status = $2 WHERE trial_id = $3 AND user_id = $4", 
            [trial_end_timestamp, trial_status, trial_id, user_id ]
        );

         // Fetch the updated trial data
         const updatedResult = await pool.query(
              "SELECT trial_status FROM trials WHERE trial_id = $1 AND user_id = $2", 
              [trial_id, user_id]
         );

         if (updatedResult.rows.length > 0) {
              const status = updatedResult.rows[0].trial_status;
              
              if(status === 'completed') {
                
                   try {

                    const newUser = await pool.query(
                        "INSERT INTO trials (trial_date, trial_number, trial_start_timestamp, trial_end_timestamp, trial_status, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
                        [trial_date, trial_number, trial_end_timestamp, 'null', 'ongoing', user_id]
                    );


                    const newtrial_id = newUser.rows[0].trial_id;
                    //console.log("trial id: "+newtrial_id);
                    return newtrial_id; // Return the trial_id for further use

                   } catch (error) {
                    // Handle the error gracefully
                    console.error("Error inserting trial:", error);
                    throw error; // Re-throw the error to be caught higher up in the call stack
                }
              }
         } else {
              console.log("No rows found after update.");
         }

    } catch (error) {
        // Handle the error gracefully
        console.error("Error inserting trial:", error);
        throw error; // Re-throw the error to be caught higher up in the call stack
    }


    

 /*   try {


          const result = await pool.query(
            "SELECT trial_start_timestamp FROM trials WHERE trial_id = $1 AND user_id = $2",
            [trial_id, user_id]
          );
          
          // Check if there's a result and access the timestamp property
          if (result.rows.length > 0) {
            const trial_start_timestamp = result.rows[0].trial_start_timestamp;
            console.log("trial_start_time: " + trial_start_timestamp);

            try {

                const newTrial = await pool.query(
                    "INSERT INTO trials (trial_date, trial_number, trial_start_timestamp, trial_end_timestamp, trial_status, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
                    [trial_date, trial_number, trial_start_timestamp, trial_end_timestamp, trial_status, user_id]
                );
                
                
                const newtrial_id = newTrial.rows[0].trial_id;
                console.log("trial id: "+newtrial_id);

            } catch (error) {
                // Handle the error gracefully
                console.error("Error inserting trial:", error);
                throw error; // Re-throw the error to be caught higher up in the call stack
            }

          } else {
            console.log("No trial start time found for the specified trial and user.");
          }
          

    } catch (error) {
        // Handle the error gracefully
        console.error("Error inserting trial:", error);
        throw error; // Re-throw the error to be caught higher up in the call stack
    }

    */
};



/*
    console.log("trial date: "+trial_date+ ", \ntrial number: "+trial_number+
                ",\ntrial start timestamp "+trial_start_timestamp+
                ",\ntrial end timestamp "+trial_end_timestamp+",\ntrial status: "+trial_status+",\nuser id: "+ user_id);

*/

module.exports = {trialModel, updateTrialModel};