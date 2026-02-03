const express = require('express');
const app = express();
const port = 3002;

app.get('/', (req, res) => {
  const name = req.query.name;
  const lastName = req.query.lastName;

  res.send(`Hello ${name} ${lastName}`);
  //res.send('Hello World!!');
});

app.listen(3002, () => {
  console.log('Servidor corriendo en http://localhost:3002');
});
