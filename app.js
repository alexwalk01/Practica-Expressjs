const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(express.json());

const usersFile = path.join(__dirname, 'users.json');

const readUsers = async () => {
  try {
    const data = await fs.readFile(usersFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeUsers = async (users) => {
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
};

app.get('/users', async (req, res) => {
  const users = await readUsers();
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const users = await readUsers();
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  res.json(user);
});

app.post('/users', async (req, res) => {
  const users = await readUsers();
  const newUser = {
    id: req.body.id,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    email: req.body.email,
    gender: req.body.gender,
  };

  users.push(newUser);
  await writeUsers(users);
  res.status(201).json(newUser);
});

app.delete('/users/:id', async (req, res) => {
  const users = await readUsers();
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  users.splice(index, 1);
  await writeUsers(users);
  res.json({ message: 'Usuario eliminado' });
});

app.put('/users/:id', async (req, res) => {
  const users = await readUsers();
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  users[index] = { ...users[index], ...req.body, id };
  await writeUsers(users);
  res.json(users[index]);
});

app.listen(3002, () => {
  console.log('Servidor corriendo en el puerto 3002');
});
