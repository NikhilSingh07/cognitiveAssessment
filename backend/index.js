const express = require('express');
const app = express();
const port = 3000;

const gameRoutes = require('./routes/gameRoutes');

app.use(express.json());

app.use('/', gameRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
