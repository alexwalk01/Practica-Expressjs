require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

let db;
let usersCollection;
let productsCollection;
let purchasesCollection;

/* ============================
   CONEXIÓN A MONGODB
============================ */
MongoClient.connect(MONGO_URI)
  .then((client) => {
    db = client.db(DB_NAME);

    usersCollection = db.collection('users');
    productsCollection = db.collection('products');
    purchasesCollection = db.collection('purchases');

    console.log('Conectado a MongoDB');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => console.error('Error de conexión:', err));

/* ============================
   USERS CRUD
============================ */

// GET todos
app.get('/users', async (req, res) => {
  const users = await usersCollection.find().toArray();
  res.json(users);
});

// GET por ID
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

/* ============================
   PRODUCTS ENDPOINTS
============================ */

// GET todos los productos
app.get('/products', async (req, res) => {
  const products = await productsCollection.find().toArray();
  res.json(products);
});

// POST crear producto
app.post('/products', async (req, res) => {
  const product = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imgUrl: req.body.imgUrl,
    categories: req.body.categories || [],
    options: req.body.options || [],
  };

  const result = await productsCollection.insertOne(product);
  res.status(201).json(result);
});

/* ============================
   PURCHASES ENDPOINTS
============================ */

// GET todas las compras
app.get('/purchases', async (req, res) => {
  const purchases = await purchasesCollection.find().toArray();
  res.json(purchases);
});

// POST crear compra
app.post('/purchases', async (req, res) => {
  try {
    const purchase = {
      userId: new ObjectId(req.body.userId),
      products: req.body.products.map((p) => ({
        productId: new ObjectId(p.productId),
        quantity: p.quantity,
      })),
      date: new Date(),
    };

    const result = await purchasesCollection.insertOne(purchase);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: 'Datos inválidos' });
  }
});
