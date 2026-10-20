import express from 'express';
import cafeteriaRoutes from './src/routes/cafeteriaRoutes';

const app = express();

app.use(express.json());
app.use('/', cafeteriaRoutes);

export default app;