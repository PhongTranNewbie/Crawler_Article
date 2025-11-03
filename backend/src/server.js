import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';
import articleRoutes from './routes/articleRoutes.js';
import './cron/crawlerJob.js';
import { swaggerUi, swaggerSpec } from './config/swagger.js';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('News API is running');
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/articles', articleRoutes);

// Sync database and start server
sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        return sequelize.sync({ alter: true});
    })
    .then(() => {
        console.log('Database synced...');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });