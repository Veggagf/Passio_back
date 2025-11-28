const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const config = require('./config/env');

const app = express();

app.use(helmet());

app.use(cors({
    origin: config.cors.origin,
    credentials: true,
}));

app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'combined'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API Base Iniciada', 
        version: '0.0.1',
    });
});

app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada',
    });
});
 
module.exports = app;