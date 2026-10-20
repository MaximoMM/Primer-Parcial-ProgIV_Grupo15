import request from 'supertest';
import app from '../src/app';
import { Expreso } from '../src/models/Expreso';

describe('TDD - Cafetería Origen (Fase Roja)', () => {
test('El cálculo del precio del Expreso debe fallar o no estar implementado aún', () => {
    const expreso = new Expreso(1, 'Expreso Pocillo Brasil', 'Pocillo', 'Brasil');

    expect(expreso.calcularPrecio()).toBe(5020);
});

test('GET /productos debe fallar porque la ruta no está implementada', async () => {
    const res = await request(app).get('/productos');
    expect(res.status).toBe(200);
});
});