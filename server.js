const app = require('./src/app');
const { connectDB } = require('./src/config/database');
const config = require('./src/config/env');

require('./src/models');

const startServer = async () => {
    try {
        await connectDB();

    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
};
