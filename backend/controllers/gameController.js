
const {createPairs, updateGrid, updatePatterns, getItemPosition, getShapeDetails}= require('./gridController');
const {getPatterns, getTotalTrials, getCurrentTrial, getShapeGrid, getFruitCount, getTotalFruits, updateCurrentTrial, initializeFruitCount} = require('../utils/gameUtils');
const {trialModel, updateTrialModel} = require('../models/trialModel');
const clickModel = require('../models/clickModel');


const testing = (req, res) => {

  console.log("testing called");
  res.json({message: "hello from server"});
}

const initializeItems = (req, res) => {
  

   // DUMMY DATA for db:
   
   const trial_date =  "2023-09-01";
   const trial_number = 1;
   const trial_start_timestamp = "2023-09-01 10:00:00";
   //const trial_start_timestamp = new Date(trial_start_timestamp_string);
   const trial_end_timestamp =  "null";
   //const trial_end_timestamp =  new Date(trial_end_timestamp_string)
   const trial_status = "ongoing";

   const user_id= req.user_id;

   const shapeGrid = req.body.shapeGrid;
   const patterns = req.body.patterns;
   let currentTrial = req.body.currentTrial;
   let fruitCount = req.body.fruitCount;
   
   //console.log("shapeGrid: "+shapeGrid, "\npatterns: "+patterns+"\ncurrentTrial: "+currentTrial, "\nfruitCount: "+fruitCount);

   if(shapeGrid !== null && shapeGrid !== undefined && patterns !== null && patterns !== undefined && 
      currentTrial !== null && currentTrial !== undefined && fruitCount !==null && fruitCount !==undefined &&
      shapeGrid !== "" && patterns !== "" && currentTrial !== "" && fruitCount !== "") {

        if(shapeGrid.length !== 0) {
              
           createPairs(req, res, trial_date, trial_number, trial_start_timestamp, trial_end_timestamp, trial_status, user_id);

        } else {
          res.json({message: 'shapeGrid is empty.'})
        }

   } else {
    res.json({message: 'req is empty or incomplete'});
   }
   


};

const getGamePatterns = (req, res) => {

    console.log("getPatterns gets called");

    const patterns = req.body.patterns;
    const currentTrial = req.body.currentTrial;

    if (patterns !== null && patterns !== undefined && currentTrial !== null && currentTrial !==undefined
      && patterns !== "" && currentTrial !="") {
      console.log(patterns);

      if(currentTrial <= getTotalTrials()) {
  
        if(patterns.length != 0) {
          res.json({
            "total trails": getTotalTrials(),
            "current trial": currentTrial,
            "patterns": patterns
          }); 
        } else {
          res.json({
            "status": "Items not Initialized yet!."
          });
        }
  
      } else {
        res.json({"status": "Game Over!."});
      }

    } else {

      res.json({message: 'req body is empty or incomplete.'})
    }



};

const itemClicked = (req, res) => {
  
  console.log("itemClicked called.");

    const user_id = req.user_id;
    const trial_id = req.body.trial_id;
    let click_number = req.body.click_number;
    const shapeGrid = req.body.shapeGrid;
    const patterns = req.body.patterns;
    let fruitCount= req.body.fruitCount;
    const shapeId = req.body.clickedShapeId;
    const currentTrial= req.body.currentTrial;


   // console.log(shapeId);
    
    if(patterns.length != 0) {


      if (
        trial_id !== undefined && trial_id !== null && trial_id !== "" &&
        click_number !== undefined && click_number !== null && click_number !== "" &&
        shapeGrid !== undefined && shapeGrid !== null && shapeGrid.length !==0 &&
        patterns !== undefined && patterns !== null && patterns.length !== 0 &&
        fruitCount !== undefined && fruitCount !== null && fruitCount !== "" &&
        shapeId !== undefined && shapeId !== null && shapeId !== "" &&
        currentTrial !== undefined && currentTrial !== null && currentTrial !== ""
        
        ) {

          if(fruitCount < getTotalFruits()) {

            // console.log('Received request body:', req.body);
             
             //const shapeId = req.body.clickedShapeId;
             
             const shapeId = String(req.body.clickedShapeId);
             const clickedIndex = getItemPosition(shapeGrid, shapeId);
 
            // console.log("clickedIndex:" +clickedIndex);
             const totalColumns = 5;
             const rowIndex = Math.floor(clickedIndex / totalColumns);
             const columnIndex = clickedIndex % totalColumns;
 
         //    console.log("index:"+clickedIndex+"row index: "+rowIndex+ ", column index: "+ columnIndex);
 
 
             const fruitDetails = updateGrid(req);

             fruitCount= fruitDetails[1];
             fruit = fruitDetails[0];

            const shapeDetails = getShapeDetails(req);
            console.log("shapeType: "+shapeDetails[0], "shapeSize: "+shapeDetails[1], "fruit: "+fruit);


             click_number +=1;

             clickModel(user_id, trial_id,shapeId, fruit, click_number, rowIndex, columnIndex );
 
             if(fruitCount == getTotalFruits()) {
               res.json({"status": 'User has found all the fruits in given Trial!.', "fruitCount": fruitCount});
             } else {
 

             
 
             //shuffleGrid(shapeGrid);
            // console.log(getShapeGrid);
             res.json({
               trial_id: trial_id,
               click_number: click_number,
               currentTrial: currentTrial,
               fruitCount: fruitCount,
               shapeGrid: shapeGrid
             });
             }
 
         
           } else {
         
             res.json({"status": 'User has found all the fruits in given Trial!.',  "fruitCount": fruitCount});
           }


      } else {

        console.log("req body is incomplete.");
        res.json({message: "request body is incomplete"});
      }

    } else {
        res.json({
          "status": "Items not Initialized yet!."
        });
      }


    
};


const nextTrial = async (req, res) =>{


  const trial_date =  "2023-09-01";  //DUMMY
  const trial_start_timestamp = "null";   
  //const trial_start_timestamp = new Date(trial_start_timestamp_string);
  const trial_end_timestamp =  "2023-09-01 10:00:00";   //DUMMY
  //const trial_end_timestamp =  new Date(trial_end_timestamp_string)
  const trial_status = "completed"; 

    const shapeGrid = req.body.shapeGrid;
    const patterns = req.body.patterns;
    let fruitCount = req.body.fruitCount;
    let currentTrial= req.body.currentTrial;
    let trial_id = req.body.trial_id;
    const user_id = req.user_id;
    const click_number = 0;

    if (
      trial_id !== undefined && trial_id !== null && trial_id !== "" &&
      shapeGrid !== undefined && shapeGrid !== null && shapeGrid.length !==0 &&
      patterns !== undefined && patterns !== null && patterns.length !== 0 &&
      fruitCount !== undefined && fruitCount !== null && fruitCount !== "" &&
      currentTrial !== undefined && currentTrial !== null && currentTrial !== ""  
      ) {

        if(fruitCount == getTotalFruits()) {
          //updateCurrentTrial();
          currentTrial += 1;
  
          if(currentTrial <= getTotalTrials()) {
              
              //initializeFruitCount();
              fruitCount = 0;
  
              updatePatterns(currentTrial, req, res);
              trial_id=  await updateTrialModel(trial_id, trial_date, currentTrial, trial_end_timestamp, trial_status, user_id);
              //console.log("new Trial id: "+trial_id);
              res.json({click_number, trial_id, currentTrial, fruitCount, shapeGrid, patterns});
  
          } else {
              
              
              res.json({"status": "Game Over!."});
          }
  
      } else {
          res.json({
              "status": "Previous trial isn't completed yet!."
            });
  
      }

      } else {
        console.log("req body is incomplete.");
        res.json({message: "request body is incomplete"});
        
      }

    


};

module.exports = {initializeItems, getGamePatterns, itemClicked, nextTrial, testing};