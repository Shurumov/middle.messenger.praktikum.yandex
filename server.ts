const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const PORT = 3000;

app.use(express.static('./dist'));

app.get('*', (_req: any, res: any) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
