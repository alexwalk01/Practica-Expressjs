require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(express.json());

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

let db;
let usersCollection;

// Conexión a MongoDB
MongoClient.connect(MONGO_URI)
  .then((client) => {
    db = client.db(DB_NAME);
    usersCollection = db.collection('users');
    console.log('Conectado a MongoDB');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => console.error(err));

/* ============================
   CRUD DE USUARIOS
============================ */

// GET TODOS
app.get('/users', async (req, res) => {
  const users = await usersCollection.find().toArray();
  res.json(users);
});

// GET POR ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await usersCollection.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch {
    res.status(400).json({ error: 'ID inválido' });
  }
});

// POST
app.post('/users', async (req, res) => {
  const result = await usersCollection.insertOne(req.body);
  res.status(201).json(result);
});

// PUT
app.put('/users/:id', async (req, res) => {
  try {
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario actualizado' });
  } catch {
    res.status(400).json({ error: 'ID inválido' });
  }
});

// DELETE
app.delete('/users/:id', async (req, res) => {
  try {
    const result = await usersCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario eliminado' });
  } catch {
    res.status(400).json({ error: 'ID inválido' });
  }
});
