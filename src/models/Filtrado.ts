import { Producto } from './Producto';

export class Filtrado extends Producto {
  tamano: string; 
  variedad: string;

  constructor(id: number, nombre: string, tamano: string, variedad: string) {
    super(id, nombre, 3200); 
    this.tamano = tamano;
    this.variedad = variedad;
  }

  calcularPrecio(): number {
    let gramos = 0;
    if (this.tamano === 'Pocillo') gramos = 6;
    else if (this.tamano === 'Mediano') gramos = 15;
    else if (this.tamano === 'Taza grande') gramos = 25;

    let precioPorGramos = 0;
    if (this.variedad === 'Brasil') precioPorGramos = 140;
    else if (this.variedad === 'Colombia') precioPorGramos = 180;
    else if (this.variedad === 'Etiopía') precioPorGramos = 240;

    const costoCafe = gramos * precioPorGramos;
    return this.precioBase + costoCafe;
  }
}