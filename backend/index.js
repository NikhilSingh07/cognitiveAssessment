const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get( '/getItems', (req, res)=> {
 
  console.log('No items found!.');
  res.status(204).json({});
  
}
);