const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORTNUMBER || 3001;

const gameRoutes = require('./routes/gameRoutes');
const userRoutes= require('./routes/userRoutes');

app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.use('/assessment/', gameRoutes);
app.use('/user/', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
