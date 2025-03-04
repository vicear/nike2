import { Injectable, Signal, signal} from '@angular/core';
import { product } from '../../interface/productos';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  obtenerProductos(): any[] {
    throw new Error('Method not implemented.');
  }

  public products = signal<product[]>([]);
  constructor() { }


loadProducts(): Signal<product[]> {
  return this.products;
}

addProduct(product: product): void {
  this.products.update((products) => [...products, product]);
  }
}