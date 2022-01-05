const express = require('express');
const connection = require('./config/db');
const cors = require('cors');
const app = express();
connection(); // Ejecutar la function de conexion
app.use(cors({credentials: true, origin: true})); //Cors
app.options("*", cors());
const port = process.env.PORT || 4000;
app.use(express.json({extended: true})); // Habilitar lectura de json

app.use(express.static('uploads'));

app.use('/api/categories', require('./routes/categories'));
app.use('/api/services', require('./routes/services'))
app.use('/api/times', require('./routes/times'));
app.use('/api/shifts', require('./routes/shifts'));

app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
});