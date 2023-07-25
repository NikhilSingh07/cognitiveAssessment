const express = require('express')
const shapeGrid= require('./shapeGrid')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// gets called when the user opens the application. 

app.get( '/getItems', (req, res)=> {
 
  res.json(shapeGrid);
  
}
);