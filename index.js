const express = require('express');
const app = express();

app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.send('🚀 Hola desde mi API en Cloud Run!');
});

// Ruta de ejemplo
app.get('/saludo/:nombre', (req, res) => {
  const { nombre } = req.params;
  res.json({ mensaje: `Hola, ${nombre}! Bienvenido a mi API.` });
});

// Escuchar en puerto 8080 (requerido por Cloud Run)
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
