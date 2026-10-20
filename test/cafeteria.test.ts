import { describe, test, expect } from 'vitest';
import request from 'supertest';
import app from '../app';
import { Expreso } from '../src/models/Expreso';

describe('TDD - Cafetería Origen (Fase Verde)', () => {
test('El cálculo del precio del Expreso debe dar 5020', () => {
    const expreso = new Expreso(1, 'Expreso Pocillo Brasil', 'Pocillo', 'Brasil');
    expect(expreso.calcularPrecio()).toBe(5020);
});

test('GET /productos debe responder con status 200', async () => {
    const res = await request(app).get('/productos');
    expect(res.status).toBe(200);
});
});