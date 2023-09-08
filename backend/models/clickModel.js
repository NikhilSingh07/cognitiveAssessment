const pool = require('../database/database');
const path = require("path"); 
const dotenv = require("dotenv");
const envPath = path.join(__dirname, '..','.env');

const clickModel = async(user_id, trial_id,shapeId, fruit, click_number, rowIndex, columnIndex )=> {


    const click_timestamp = "2023-09-01 10:00:00";  //DUMMY
    let fruit_id = 0;


 
    if(fruit === process.env.FRUIT_1) {
        fruit_id = process.env.FRUIT_1_ID
    } else if(fruit === process.env.FRUIT_2) {
        fruit_id = process.env.FRUIT_2_ID
    } else if(fruit === process.env.FRUIT_3) {
        fruit_id = process.env.FRUIT_3_ID
    }


    console.log("user_id: "+user_id+"\ntrial_id: "+trial_id+"\nitem_id: "+shapeId+"\nfruit: "+fruit+"\nfruit_id: "+fruit_id,"\nclick_number: "+click_number+
    "\nclick_row_positon: "+rowIndex+"\nclick_column_position: "+columnIndex);


    try {
        const newUser = await pool.query(
            "INSERT INTO clicks(click_number, click_row_position, click_column_position, click_timestamp, user_id, trial_id, item_id, fruit_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [click_number, rowIndex, columnIndex, click_timestamp, user_id, trial_id, shapeId, fruit_id]
        );

    const click_id = newUser.rows[0].trial_id;
      console.log("click id: "+click_id);
      //  return trial_id; // Return the trial_id for further use

    } catch (error) {
        // Handle the error gracefully
        console.error("Error inserting trial:", error);
        throw error; // Re-throw the error to be caught higher up in the call stack
    }

    
};


module.exports = clickModel;