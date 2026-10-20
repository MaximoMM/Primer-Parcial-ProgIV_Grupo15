import { Producto } from './Producto';

export interface ItemPedido {
  productoId: number;
  cantidad: number;
  producto?: Producto; // esto es opcional para facilitar la asociacion en la memoria
}

export class Pedido {
  id: number;
  items: ItemPedido[];
  estado: string;

  constructor(id: number, items: ItemPedido[], estado: string = 'Pendiente') {
    this.id = id;
    this.items = items;
    this.estado = estado;
  }

  calcularTotal(productosDisponibles: Producto[]): number {
    let total = 0;
    for (const item of this.items) {
      const prod = productosDisponibles.find(p => p.id === item.productoId);
      if (prod) {
        total += prod.calcularPrecio() * item.cantidad;
      }
    }
    return total;
  }
}