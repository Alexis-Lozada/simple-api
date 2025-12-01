const express = require('express');
const app = express();

app.use(express.json());

// --- Datos en memoria (NO BD, solo ejemplo) ---
let usuarios = [
  { id: 1, nombre: 'Alexis', email: 'alexis@example.com' },
  { id: 2, nombre: 'Sam', email: 'sam@example.com' },
];

// ========= RUTA RAÍZ (GET) =========
app.get('/', (req, res) => {
  res.send('🚀 Hola desde mi API en Cloud Run!');
});

// ========= GET: listar usuarios =========
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

// ========= GET: obtener un usuario por id =========
app.get('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }

  res.json(usuario);
});

// ========= POST: crear usuario =========
app.post('/usuarios', (req, res) => {
  const { nombre, email } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ mensaje: 'Nombre y email son requeridos' });
  }

  const nuevoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;

  const nuevoUsuario = {
    id: nuevoId,
    nombre,
    email,
  };

  usuarios.push(nuevoUsuario);

  res.status(201).json({
    mensaje: 'Usuario creado correctamente',
    usuario: nuevoUsuario,
  });
});

// ========= PUT: actualizar usuario =========
app.put('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { nombre, email } = req.body;

  const indice = usuarios.findIndex(u => u.id === id);
  if (indice === -1) {
    return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }

  // Actualizamos solo los campos enviados
  if (nombre !== undefined) usuarios[indice].nombre = nombre;
  if (email !== undefined) usuarios[indice].email = email;

  res.json({
    mensaje: 'Usuario actualizado correctamente',
    usuario: usuarios[indice],
  });
});

// ========= Ruta de ejemplo con parámetro (GET) =========
app.get('/saludo/:nombre', (req, res) => {
  const { nombre } = req.params;
  res.json({ mensaje: `Hola, ${nombre}! Bienvenido a mi API.` });
});

// Puerto 8080 (requerido por Cloud Run)
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
