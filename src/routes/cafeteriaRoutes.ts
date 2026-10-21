import { Router } from 'express';
import {
    getProductos,
    getProductoById,
    crearPedido,
    getPedidos,
    getPedidoById,
    getFacturacion,
    getProductoMasVendido
} from '../controllers/cafeteriaController';

const router = Router();

router.get('/productos', getProductos);
router.get('/productos/:id', getProductoById);

router.post('/pedidos', crearPedido);
router.get('/pedidos', getPedidos);
router.get('/pedidos/:id', getPedidoById);

router.get('/reportes/facturacion', getFacturacion);
router.get('/reportes/mas-vendido', getProductoMasVendido);

export default router;