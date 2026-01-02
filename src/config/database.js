import dotenv from "dotenv";
import {Sequelize} from "sequelize";

dotenv.config();


//create a new Sequelize instance
const sequelize = new Sequelize(
    process.env.DB_NAME || 'test',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false,
    });


//Test the connection
const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected has been established successfully.');
    }catch (error) {
        console.log('Unable to connect to the database:',error);
    }
};

export {dbConnection, sequelize};