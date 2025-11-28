const { Sequelize } = require('sequelize');
const config = require('./env');

const sequelize = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    {
        host: config.database.host,
        port: config.database.port,
        dialect: 'mysql',
        logging: config.nodeEnv === 'development' ? console.log : false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        define: {
            timestamps: true,
            underscored: true,
        },
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a MySQL establecida correctamente');

        await sequelize.sync({ alter: config.nodeEnv === 'development' });
        console.log('Modelos sincronizados con la base de datos');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };