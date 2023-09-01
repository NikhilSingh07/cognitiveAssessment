//const shapeGrid = require('../models/gameModel');
//const patterns = require('../models/gamePattern');
const trialModel= require('../models/trialModel');
const shapeGrid = require('../models/gameModel');
const {getTotalPatterns, updateCurrentTrial, updateFruitCount, getCurrentTrial} = require('../utils/gameUtils')

// TC: O(n)
// SC: O(m)

const createPairs = async(req, res, trial_date, trial_number, trial_start_timestamp, trial_end_timestamp, trial_status, user_id) => {
  
    const shapeGrid = req.body.shapeGrid;
    const patterns = req.body.patterns;
    let currentTrial = req.body.currentTrial;
    let fruitCount = req.fruitCount;
    let trial_id = 0;


    if(patterns.length === 0) {
       // console.log('createPairs called!');

       //saing the data in the database
        trial_id = await trialModel(trial_date, trial_number, trial_start_timestamp, trial_end_timestamp, trial_status, user_id);

        if(trial_id !== 0) {

            shuffleGrid(req);
    
            const shapes = shapeGrid.filter(item => item.shapeTypeId !== 'null');
        
            const uniqueShapeTypes = new Set(shapes.map(item => item.shapeTypeId));
        
            console.log(uniqueShapeTypes);
    
            for (let i = 0; i < getTotalPatterns(); i++) {
                patterns.push({ pattern: `${i+1}`, firstElementID: Array.from(uniqueShapeTypes)[i * 2], secondElementID: Array.from(uniqueShapeTypes)[i * 2 + 1], fruitProducedByID: 'null'});
            }
            currentTrial = initializeItems(req, res);
            shuffleGrid(req);
           // console.log("currentrial: "+currentTrial);
    
            res.json({message: 'Items initialized sucessfully!.', trial_id: trial_id, currentTrial: currentTrial, fruitCount: fruitCount, shapeGrid: shapeGrid, patterns: patterns});
    

        } else {
    
          console.log("some error happened at database, trail id is 0");
          res.json({message: "some error happedned at the database"});
        }


    } else {

        console.log('Items are already Initialized!.');
        res.json({messgae: 'Items are already Initialized!.'});
    }

};

//Time complexity: O(n), assuming Math.random() takes a constant time.
//Space complexity: O(1), no extra memeory is used.
// Fisher Yates algorithm

const shuffleGrid = (req) => {

    const shapeGrid = req.body.shapeGrid;

    for (var i = shapeGrid.length-1; i>0; i--) {       

                // Pick a random index from 0 to i inclusive
                let j = Math.floor(Math.random() * (i + 1));
 
                // Swap arr[i] with the element
                // at random index
                [shapeGrid[i], shapeGrid[j]] = [shapeGrid[j], shapeGrid[i]];
    }
}
  

const initializeItems = (req, res) => {
   // console.log("initialize Items called!.");

   const shapeGrid = req.body.shapeGrid;
   const patterns = req.body.patterns;
   let currentTrial = req.body.currentTrial;

    if(patterns.length!=0) {
        
       // updateCurrentTrial();
       currentTrial =currentTrial+ 1;
      // console.log("currentTrial"+currentTrial);

      //  console.log(getCurrentTrial());
        for(let i = 0; i<patterns.length; i++) {

            for(let j =0; j<shapeGrid.length; j++) {

                switch(patterns[i].pattern) {

                    case '1':

                        if(patterns[i].firstElementID === shapeGrid[j].shapeTypeId || patterns[i].secondElementID == shapeGrid[j].shapeTypeId) {
                             
                            shapeGrid[j].pattern = '1'
                            shapeGrid[j].producedFruit = false;

                        }
                        
                    break;
                    
                    case '2':

                        if(patterns[i].firstElementID === shapeGrid[j].shapeTypeId ) {
                             
                            shapeGrid[j].pattern = '2';
                            shapeGrid[j].producedFruit = true;
                            shapeGrid[j].fruit = 'Apple';
                            patterns[i].fruitProducedByID = patterns[i].firstElementID;
                        }

                        if(patterns[i].secondElementID === shapeGrid[j].shapeTypeId) {

                            shapeGrid[j].pattern = '2';
                        }

                    break;
                    
                    case '3':

                        if(patterns[i].firstElementID === shapeGrid[j].shapeTypeId ) {
                             
                            shapeGrid[j].pattern = '3';
                            shapeGrid[j].producedFruit = true;
                            shapeGrid[j].fruit = 'Pear';
                            patterns[i].fruitProducedByID = patterns[i].firstElementID;
                        }

                        if(patterns[i].secondElementID === shapeGrid[j].shapeTypeId) {

                            shapeGrid[j].pattern = '3';
                        }

                    break;    

                }
            }

        }   
        
        return currentTrial;
        

    } else {
        console.log('patterns not created yet!.');
       // res.json({messgage: 'patterns not created yet!.'});

    }
}


const updatePatterns = (currentTrial, req, res) =>{

    const patterns = req.body.patterns;

    resetShapeGrid(req);
    console.log("currentTrial: "+currentTrial);
    if(patterns.length > 0 ){

        if(currentTrial % 2 !== 0) {

            console.log(patterns);   

            for (const pattern of patterns) {
                if (pattern.pattern === "3") {
                  //pattern.fruitProducedByID = pattern.secondElementID;
                   if(pattern.fruitProducedByID === pattern.firstElementID) {

                        pattern.fruitProducedByID = pattern.secondElementID;

                    } else if(pattern.fruitProducedByID === pattern.secondElementID) {

                        pattern.fruitProducedByID = pattern.firstElementID;
                    }

                  updateShapeGrid(req, pattern.fruitProducedByID, "Pear");
                }
    
                if(pattern.pattern === "2") {

                    if(pattern.fruitProducedByID === pattern.firstElementID) {

                        pattern.fruitProducedByID = pattern.secondElementID;

                    } else if(pattern.fruitProducedByID === pattern.secondElementID) {

                        pattern.fruitProducedByID = pattern.firstElementID;
                    }

                   updateShapeGrid(req, pattern.fruitProducedByID, "Apple")
                }
              }
        } else {

            console.log(patterns); 

            for(const pattern of patterns) {


                if (pattern.pattern === "3") {

                     if(pattern.fruitProducedByID === pattern.firstElementID) {
  
                          pattern.fruitProducedByID = pattern.firstElementID;
  
                      } else if(pattern.fruitProducedByID === pattern.secondElementID) {
  
                          pattern.fruitProducedByID = pattern.secondElementID;
                      }
  
                    updateShapeGrid(req, pattern.fruitProducedByID, "Pear");
                  }
    
                if(pattern.pattern === "2") {

                    if(pattern.fruitProducedByID === pattern.firstElementID) {

                        pattern.fruitProducedByID = pattern.secondElementID;

                    } else if(pattern.fruitProducedByID === pattern.secondElementID) {

                        pattern.fruitProducedByID = pattern.firstElementID;
                    }
                    updateShapeGrid(req, pattern.fruitProducedByID, "Apple");
                }

            }
        }

        shuffleGrid(req);

    } else {

        console.log("Patterns are Empty!.")
    }

}

const resetShapeGrid = (req) => {

    const shapeGrid = req.body.shapeGrid;

    shapeGrid.forEach(shape => {
        shape.producedFruit = false;
        shape.hasProducedFruit = false;
        shape.fruit = 'null';
      });
}

 
const updateShapeGrid = (req, fruitProducedByID, fruit) => {

    const shapeGrid = req.body.shapeGrid;

    shapeGrid.forEach(shape => {

        if(shape.shapeTypeId === fruitProducedByID) {
            shape.producedFruit = true;
            shape.fruit = fruit;
        }
    })
}


const updateGrid = (req) => {
       
    const shapeGrid = req.body.shapeGrid;
    const shapeId = String(req.body.clickedShapeId);
    let fruitCount = req.body.fruitCount;


   // console.log("Receibed shape:"+shapeGrid);
    
    // Log the value of shapeId to ensure it's correct
   // console.log("Received shapeId:"+ shapeId);

    const clickedShape = shapeGrid.find(shape => shape.shapeId === shapeId);

    // Log the contents of the clickedShape to see its properties
   // console.log("Clicked Shape:", clickedShape);

    if(clickedShape) {

             if(clickedShape.shapeTypeId !== 'null') {

                if (clickedShape.producedFruit && !clickedShape.hasProducedFruit) {

                    clickedShape.hasProducedFruit = true;
                    //updateFruitCount();
                    fruitCount = fruitCount + 1;
                }
             }

             shuffleGrid(req);

             return fruitCount;

    } else {
        console.log("shape not found!");
       // res.json({message: 'shape not found!'});
    }
}

const getItemPosition = (shapeGrid, shapeId) =>{

    const itemIndex = shapeGrid.findIndex(shape => shape.shapeId === shapeId);
    return itemIndex;
}



module.exports = {
   
shuffleGrid,
createPairs,
updateGrid,
updatePatterns,
getItemPosition

};