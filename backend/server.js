import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import connect from './db/connection.js';
import userRoutes from './api/routes/userRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('API is working!');
});

// Connect DB & Start Server
connect().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch((err) => {
  console.error('❌ Database connection failed:', err.message);
});
