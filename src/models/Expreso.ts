import { Producto } from './Producto';

export class Expreso extends Producto {
  tamano: string; // 'el tamaño del cafe'
  variedad: string; // 'de donde es el grano de cafe'

  constructor(id: number, nombre: string, tamano: string, variedad: string) {
    super(id, nombre, 2500);
    this.tamano = tamano;
    this.variedad = variedad;
  }

  calcularPrecio(): number {
    let gramos = 0;
    if (this.tamano === 'Pocillo') gramos = 18;
    else if (this.tamano === 'Mediano') gramos = 27;
    else if (this.tamano === 'Taza grande') gramos = 36;

    let precioPorGramos = 0;
    if (this.variedad === 'Brasil') precioPorGramos = 140;
    else if (this.variedad === 'Colombia') precioPorGramos = 180;
    else if (this.variedad === 'Etiopía') precioPorGramos = 240;

    const costoCafe = gramos * precioPorGramos;
    return this.precioBase + costoCafe;
  }
}