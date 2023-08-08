const express = require('express')
const { patterns, shapeGrid, shuffleGrid, createPairs, getPatterns, getShapeGrid } = require('./shapeGrid');
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



app.get( '/getItems', (req, res)=> {
  createPairs(shapeGrid);
  shuffleGrid(shapeGrid);
  res.json(getShapeGrid);
});

// gets called when the user opens the application. 
app.get('/initializeItems', (req, res) => {

  createPairs(shapeGrid);
  shuffleGrid(shapeGrid);
  res.json(shapeGrid);
});

app.get('/getPatterns', (req, res) => {


  console.log(getPatterns())
  res.json(getPatterns());  
})