const {createPairs, updateGrid, updatePatterns}= require('./gridController');
const {getPatterns, getTotalTrials, getCurrentTrial, getShapeGrid, getFruitCount, getTotalFruits, updateCurrentTrial, initializeFruitCount} = require('../utils/gameUtils');



const initializeItems = (req, res) => {

    createPairs(getShapeGrid());
    res.json(getShapeGrid());

};

const getGamePatterns = (req, res) => {

    console.log(getPatterns());

    if(getCurrentTrial() <= getTotalTrials()) {

      if(getPatterns().length != 0) {
        res.json({
          "total trails": getTotalTrials(),
          "current trial": getCurrentTrial(),
          "patterns": getPatterns()
        }); 
      } else {
        res.json({
          "status": "Items not Initialized yet!."
        });
      }

    } else {
      res.json({"status": "Game Over!."});
    }



};

const itemClicked = (req, res) => {

    if(getPatterns().length != 0) {


        if(getFruitCount() < getTotalFruits()) {

            console.log('Received request body:', req.body);
            
            const shapeId = req.body.shapeId;
            
            updateGrid(shapeId);
            //shuffleGrid(shapeGrid);
           // console.log(getShapeGrid);
            res.json({
              trial: getCurrentTrial(),
              fruitFound:getFruitCount(),
              shapeGrid: getShapeGrid() 
            });
        
          } else {
        
            res.json({"status": 'User has found all the fruits in given Trial!.'});
          }


    } else {
        res.json({
          "status": "Items not Initialized yet!."
        });
      }


    
};


const nextTrial = (req, res) =>{
    
    if(getFruitCount() == getTotalFruits()) {
        updateCurrentTrial();

        if(getCurrentTrial() <= getTotalTrials()) {
            
            initializeFruitCount();
            updatePatterns();
            res.json(getShapeGrid());

        } else {
            res.json({"status": "Game Over!."});
        }

    } else {
        res.json({
            "status": "Previous trial isn't completed yet!."
          });

    }

};
module.exports = {initializeItems, getGamePatterns, itemClicked, nextTrial};