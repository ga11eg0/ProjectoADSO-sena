const express = require('express');
require('dotenv').config();
const personRoutes = require('./routes/persona_rutas');

const app = express();

// Middleware para que Express entienda el cuerpo en formato JSON (req.body)
app.use(express.json());

// Montamos las rutas del módulo de productos
app.use('/', personRoutes);

// Usamos el puerto definido en el .env, o el 3000 por defecto
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('¡Servidor corriendo y conectado a la base de datos!');
});
app.listen(PORT, () => {
    console.log(`🚀 Servidor asíncrono escuchando en http://localhost:${PORT}`);
});