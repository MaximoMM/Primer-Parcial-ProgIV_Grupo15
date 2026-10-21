import { Request, Response } from 'express';
import { productos, pedidos } from '../data/data';
import { Pedido } from '../models/Pedido';

export const getProductos = (req: Request, res: Response): void => {
    res.status(200).json(productos);
};

export const getProductoById = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id);
    const producto = productos.find(p => p.id === id);
    if (!producto) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
    }
    res.status(200).json(producto);
};

export const crearPedido = (req: Request, res: Response): void => {
    const { items } = req.body;
    const nuevoId = pedidos.length > 0 ? pedidos[pedidos.length - 1].id + 1 : 1;
    
    const nuevoPedido = new Pedido(nuevoId, items);

    const total = nuevoPedido.calcularTotal(productos);
    
    pedidos.push(nuevoPedido);
    
    res.status(201).json({
        id: nuevoPedido.id,
        items: nuevoPedido.items,
        estado: nuevoPedido.estado,
        total: total
    });
};

export const getPedidos = (req: Request, res: Response): void => {
    res.status(200).json(pedidos);
};

export const getPedidoById = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id);
    const pedido = pedidos.find(p => p.id === id);
    if (!pedido) {
        res.status(404).json({ error: 'Pedido no encontrado' });
        return;
    }
    res.status(200).json(pedido);
};

export const getFacturacion = (req: Request, res: Response): void => {
    const totalFacturacion = pedidos.reduce((acc, pedido) => {
        return acc + pedido.calcularTotal(productos);
    }, 0);
    res.status(200).json({ facturacionTotal: totalFacturacion });
};

export const getProductoMasVendido = (req: Request, res: Response): void => {
    const ventas: { [key: number]: number } = {};
    
    pedidos.forEach(pedido => {
        pedido.items.forEach(item => {
            ventas[item.productoId] = (ventas[item.productoId] || 0) + item.cantidad;
        });
    });

    let idMasVendido: number | null = null;
    let maxVentas = 0;

    for (const [idStr, cantidad] of Object.entries(ventas)) {
        if (cantidad > maxVentas) {
            maxVentas = cantidad;
            idMasVendido = parseInt(idStr);
        }
    }

    if (!idMasVendido) {
        res.status(404).json({ error: 'No hay ventas' });
        return;
    }

    const productoElegido = productos.find(p => p.id === idMasVendido);
    res.status(200).json({
        producto: productoElegido,
        cantidadVendida: maxVentas
    });
};