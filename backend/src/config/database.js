import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Check environment
const env = process.env.NODE_ENV || 'development';

// Load environment variables from .env file
dotenv.config({ path: `.env.${env}` });

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: env == 'development' ? console.log : false,
});

export default sequelize;
