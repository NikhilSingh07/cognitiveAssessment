const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

const gameRoutes = require('./routes/gameRoutes');
const userRoutes= require('./routes/userRoutes');

app.use(express.json());
app.use(cookieParser());

app.use('/assessment/', gameRoutes);
app.use('/user/', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
