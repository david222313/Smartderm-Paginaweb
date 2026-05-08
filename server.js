// Servidor mínimo solo para servir archivos estáticos (preview)
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos desde la raíz del proyecto
app.use(express.static(path.join(__dirname, '/')));

// Para que las rutas como /mis-cursos.html funcionen sin escribir .html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, req.path));
});

app.listen(PORT, () => {
  console.log(`Servidor de preview corriendo en puerto ${PORT}`);
});