require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',

    database: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        name: process.env.DB_NAME || 'passio_db',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'Mafe2004_',
    },

    jwt: {
        secret: process.env.JWT_SECRET || 'passio_secret_key',
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    },

    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    },
}