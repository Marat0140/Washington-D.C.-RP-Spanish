const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Necesario para servir archivos estáticos

// Configuración del servidor
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Servir archivos estáticos de la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://maratcamargo06:Apoloamigo1@washingtondcrpspanish.f5jdo.mongodb.net/?retryWrites=true&w=majority&appName=WashingtonDCRPSpanish')
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((err) => console.log(err));

// Esquema y modelo de la base de datos
const recordSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  nombre: String,
  apellido: String,
  nacionalidad: String,
  fecha_nacimiento: String,
  estatura: Number,
  genero: String,
  edad: Number,
  grupo_sanguineo: String,
  user_discord: String,
  user_roblox: String
});

const Record = mongoose.model('Record', recordSchema);

// Ruta para añadir información (POST)
app.post('/add', async (req, res) => {
  try {
    const newRecord = new Record(req.body);
    await newRecord.save();
    res.status(201).json(newRecord);
    console.log("¡Nuevo registro añadido!");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para actualizar información (PUT)
app.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRecord = await Record.findOneAndUpdate({ id }, req.body, { new: true });
    if (!updatedRecord) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }
    res.status(200).json(updatedRecord);
    console.log("¡Registro actualizado!");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para buscar un registro por ID o nombre (GET)
app.get('/search', async (req, res) => {
  const { id, nombre } = req.query;
  try {
    const query = id ? { id } : { nombre };
    const records = await Record.find(query);
    if (records.length === 0) {
      return res.status(404).json({ message: "No se encontraron registros" });
    }
    res.status(200).json(records);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para borrar información (DELETE)
app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRecord = await Record.findOneAndDelete({ id });
    if (!deletedRecord) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }
    res.status(200).json({ message: "Registro borrado exitosamente" });
    console.log("¡Registro eliminado!");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para servir el archivo inicio.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'inicio.html'));
});

// Ruta para servir el archivo index.html
app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
