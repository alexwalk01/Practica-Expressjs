const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  const { name, lastName } = req.query;

  res.send(`Hello ${name} ${lastName}`);
  //res.send('Hello World!!');
});

app.get('/users', (req, res) => {
  res.send('Solicitud GET a /users');
});

app.post('/users', (req, res) => {
  res.send('Got a POST request');
});

app.put('/users', (req, res) => {
  res.send('Got a PUT request at');
});

app.delete('/users', (req, res) => {
  res.send('Got a DELETE request at');
});

app.use((req, res) => {
  res.status(404).send('Error 404: Endpoint no encontrado');
});

app.listen(3002, () => {
  console.log('Servidor corriendo en http://localhost:3002');
});
