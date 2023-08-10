const express = require('express')
const { patterns, shapeGrid, shuffleGrid, createPairs, getPatterns, getShapeGrid, updateGrid, getFruitCount, getTotalFruits, initializeFruitCount, updateCurrentTrial, getCurrentTrial, updatePatterns, getTotalTrials } = require('./shapeGrid');
const app = express()
const port = 3000


app.use(express.json()); // To parse JSON request bodies

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



app.get( '/getItems', (req, res)=> {
  createPairs(shapeGrid);
  shuffleGrid(shapeGrid);
  res.json(getShapeGrid());
});

// gets called when the user opens the application. 
app.get('/initializeItems', (req, res) => {

  createPairs(shapeGrid);
  shuffleGrid(shapeGrid);
  res.json(shapeGrid);
});

app.get('/getPatterns', (req, res) => {


  console.log(getPatterns());
  if(getPatterns().length != 0) {
    res.json({
      "Trial": getCurrentTrial(),
      "Patterns": getPatterns()
    }); 
  } else {
    res.json({
      "status": "Items not Initialized yet!."
    });
  }
   
})


app.post('/clickedItem', (req, res) => {

  if(getFruitCount() < getTotalFruits()) {

    console.log('Received request body:', req.body);
    

    const shapeId = req.body.shapeId;

    updateGrid(shapeId);
    shuffleGrid(shapeGrid);
   // console.log(getShapeGrid);
    res.json({
      fruitFound:getFruitCount(),
      shapeGrid: getShapeGrid() 
    });

  } else {

    res.json({"status": 'User has found all the fruits in given Trial!.'});
  }


});


app.post('/next-trial', (req, res) => {

    updateCurrentTrial();

    if(getCurrentTrial() <= getTotalTrials()) {

      if(getFruitCount() == getTotalFruits()) {

        initializeFruitCount();
        updatePatterns();
        shuffleGrid(shapeGrid);
  
        res.json(getShapeGrid());
  
      } else {
  
        res.json({
          "status": "Previous trial isn't completed yet!."
        });
      }

    } else {
      res.json({"status": "Game Over!."});
    }


});