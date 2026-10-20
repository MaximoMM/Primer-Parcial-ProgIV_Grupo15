import express, { Application, Request, Response } from 'express';
import cafeteriaRoutes from './src/routes/cafeteriaRoutes';

const app: Application = express();

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    nombre: 'Cafetería Origen API',
    estado: 'En línea'
  });
});

app.use('/', cafeteriaRoutes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Ruta no encontrada en la API' });
});

export default app;