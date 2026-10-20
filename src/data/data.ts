import { Producto } from '../models/Producto';
import { Expreso } from '../models/Expreso';
import { Filtrado } from '../models/Filtrado';
import { Pasteleria } from '../models/Pasteleria';
import { Pedido } from '../models/Pedido';

export const productos: Producto[] = [
    new Expreso(1, 'Expreso Pocillo Brasil', 'Pocillo', 'Brasil'),
    new Expreso(2, 'Expreso Pocillo Colombia', 'Pocillo', 'Colombia'),
    new Expreso(3, 'Expreso Pocillo Etiopía', 'Pocillo', 'Etiopía'),
    new Expreso(4, 'Expreso Mediano Brasil', 'Mediano', 'Brasil'),
    new Expreso(5, 'Expreso Mediano Colombia', 'Mediano', 'Colombia'),
    new Expreso(6, 'Expreso Mediano Etiopía', 'Mediano', 'Etiopía'),
    new Expreso(7, 'Expreso Taza grande Brasil', 'Taza grande', 'Brasil'),
    new Expreso(8, 'Expreso Taza grande Colombia', 'Taza grande', 'Colombia'),
    new Expreso(9, 'Expreso Taza grande Etiopía', 'Taza grande', 'Etiopía'),
    
    new Filtrado(10, 'Filtrado Pocillo Brasil', 'Pocillo', 'Brasil'),
    new Filtrado(11, 'Filtrado Pocillo Colombia', 'Pocillo', 'Colombia'),
    new Filtrado(12, 'Filtrado Pocillo Etiopía', 'Pocillo', 'Etiopía'),
    new Filtrado(13, 'Filtrado Mediano Brasil', 'Mediano', 'Brasil'),
    new Filtrado(14, 'Filtrado Mediano Colombia', 'Mediano', 'Colombia'),
    new Filtrado(15, 'Filtrado Mediano Etiopía', 'Mediano', 'Etiopía'),
    new Filtrado(16, 'Filtrado Taza grande Brasil', 'Taza grande', 'Brasil'),
    new Filtrado(17, 'Filtrado Taza grande Colombia', 'Taza grande', 'Colombia'),
    new Filtrado(18, 'Filtrado Taza grande Etiopía', 'Taza grande', 'Etiopía'),
    
    new Pasteleria(19, 'Muffin de chocolate', 2500),
    new Pasteleria(20, 'Torta selva negra', 4200)
];

export const pedidos: Pedido[] = [];