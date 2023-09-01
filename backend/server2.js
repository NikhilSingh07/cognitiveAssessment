const express = require('express');
const app = express();
const port = 4000;

const gameRoutes = require('./routes/gameRoutes');
const userRoutes= require('./routes/userRoutes');

app.use(express.json());

app.use('/assessment/', gameRoutes);
app.use('/user/', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
