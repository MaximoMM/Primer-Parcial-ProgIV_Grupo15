import { describe, test, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app';
import { Expreso } from '../src/models/Expreso';
import { Filtrado } from '../src/models/Filtrado';
import { Pasteleria } from '../src/models/Pasteleria';
import { Pedido } from '../src/models/Pedido';
import { productos, pedidos } from '../src/data/data';

describe('1. Pruebas Unitarias - Modelos y Cálculo de Precios (POO)', () => {

describe('Clase Expreso (precioBase: $2500)', () => {
    test('Pocillo (18g) con Brasil ($140/g) debe costar $5020', () => {
const expreso = new Expreso(1, 'Expreso Pocillo Brasil', 'Pocillo', 'Brasil');
expect(expreso.calcularPrecio()).toBe(5020);
    });

    test('Mediano (27g) con Colombia ($180/g) debe costar $7360', () => {
const expreso = new Expreso(5, 'Expreso Mediano Colombia', 'Mediano', 'Colombia');
expect(expreso.calcularPrecio()).toBe(7360);
    });

    test('Taza grande (36g) con Etiopía ($240/g) debe costar $11140', () => {
const expreso = new Expreso(9, 'Expreso Taza grande Etiopía', 'Taza grande', 'Etiopía');
expect(expreso.calcularPrecio()).toBe(11140);
    });
});

describe('Clase Filtrado (precioBase: $3200)', () => {
    test('Pocillo (6g) con Brasil ($140/g) debe costar $4040', () => {
const filtrado = new Filtrado(10, 'Filtrado Pocillo Brasil', 'Pocillo', 'Brasil');
expect(filtrado.calcularPrecio()).toBe(4040);
    });

    test('Mediano (15g) con Colombia ($180/g) debe costar $5900', () => {
const filtrado = new Filtrado(14, 'Filtrado Mediano Colombia', 'Mediano', 'Colombia');
expect(filtrado.calcularPrecio()).toBe(5900);
    });

    test('Taza grande (25g) con Etiopía ($240/g) debe costar $9200', () => {
const filtrado = new Filtrado(18, 'Filtrado Taza grande Etiopía', 'Taza grande', 'Etiopía');
expect(filtrado.calcularPrecio()).toBe(9200);
    });
});

describe('Clase Pasteleria', () => {
    test('Muffin de chocolate debe devolver su precioBase ($2500)', () => {
const muffin = new Pasteleria(19, 'Muffin de chocolate', 2500);
expect(muffin.calcularPrecio()).toBe(2500);
    });

    test('Torta selva negra debe devolver su precioBase ($4200)', () => {
const torta = new Pasteleria(20, 'Torta selva negra', 4200);
expect(torta.calcularPrecio()).toBe(4200);
    });
});

describe('Clase Pedido', () => {
    test('calcularTotal() debe sumar correctamente (precioProducto * cantidad)', () => {
const pedido = new Pedido(1, [
        { productoId: 1, cantidad: 2 },  // 2 * 5020 = 10040
        { productoId: 19, cantidad: 1 }  // 1 * 2500 = 2500
]);
expect(pedido.calcularTotal(productos)).toBe(12540);
    });
});
});

describe('2. Pruebas de Integración - Endpoints de la API', () => {

beforeEach(() => {
    // Limpiamos los pedidos antes de cada prueba para aislar los escenarios
    pedidos.length = 0;
});

describe('GET /productos', () => {
    test('Debe devolver status 200 y la lista de los 20 productos', async () => {
const res = await request(app).get('/productos');
expect(res.status).toBe(200);
expect(Array.isArray(res.body)).toBe(true);
expect(res.body.length).toBe(20);
    });

    test('GET /productos/:id debe devolver el producto solicitado si existe', async () => {
const res = await request(app).get('/productos/1');
expect(res.status).toBe(200);
expect(res.body).toHaveProperty('id', 1);
expect(res.body).toHaveProperty('nombre', 'Expreso Pocillo Brasil');
    });

    test('GET /productos/:id debe devolver 404 si el producto no existe', async () => {
const res = await request(app).get('/productos/999');
expect(res.status).toBe(404);
expect(res.body).toHaveProperty('error', 'Producto no encontrado');
    });
});

describe('POST y GET /pedidos', () => {
    test('POST /pedidos debe crear un pedido y devolver su total calculado', async () => {
const nuevoPedido = {
        items: [
          { productoId: 1, cantidad: 2 },  // 10040
          { productoId: 20, cantidad: 1 }  // 4200
        ]
};

const res = await request(app).post('/pedidos').send(nuevoPedido);
expect(res.status).toBe(201);
expect(res.body).toHaveProperty('id', 1);
expect(res.body).toHaveProperty('estado', 'Pendiente');
expect(res.body).toHaveProperty('total', 14240);
    });

    test('GET /pedidos debe listar todos los pedidos registrados', async () => {
await request(app).post('/pedidos').send({ items: [{ productoId: 1, cantidad: 1 }] });

const res = await request(app).get('/pedidos');
expect(res.status).toBe(200);
expect(res.body.length).toBe(1);
    });

    test('GET /pedidos/:id debe devolver un pedido específico o 404 si no existe', async () => {
await request(app).post('/pedidos').send({ items: [{ productoId: 19, cantidad: 2 }] });

const resOk = await request(app).get('/pedidos/1');
expect(resOk.status).toBe(200);
expect(resOk.body).toHaveProperty('id', 1);

const res404 = await request(app).get('/pedidos/999');
expect(res404.status).toBe(404);
    });
});

describe('GET /reportes', () => {
    test('GET /reportes/facturacion debe sumar el total de todos los pedidos', async () => {
      await request(app).post('/pedidos').send({ items: [{ productoId: 1, cantidad: 1 }] });  // 5020
      await request(app).post('/pedidos').send({ items: [{ productoId: 19, cantidad: 2 }] }); // 5000

const res = await request(app).get('/reportes/facturacion');
expect(res.status).toBe(200);
expect(res.body).toHaveProperty('facturacionTotal', 10020);
    });

    test('GET /reportes/mas-vendido debe devolver el producto con mayor cantidad vendida', async () => {
await request(app).post('/pedidos').send({
        items: [
        { productoId: 1, cantidad: 1 },
    { productoId: 19, cantidad: 4 }
        ]
});

const res = await request(app).get('/reportes/mas-vendido');
expect(res.status).toBe(200);
expect(res.body).toHaveProperty('cantidadVendida', 4);
expect(res.body.producto).toHaveProperty('id', 19);
expect(res.body.producto).toHaveProperty('nombre', 'Muffin de chocolate');
    });

    test('GET /reportes/mas-vendido debe devolver 404 cuando aún no hay ventas', async () => {
const res = await request(app).get('/reportes/mas-vendido');
expect(res.status).toBe(404);
expect(res.body).toHaveProperty('error', 'No hay ventas');
    });
});
});