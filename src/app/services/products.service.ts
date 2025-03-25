import { Injectable, Signal, signal } from '@angular/core';
import { product } from '../interface/productos';

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

  async uploadImage(image: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('http://192.168.24.158:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al subir la imagen');
      }
      console.log("imagen subida correctamente")

      const data = await response.json();
      return data.imageUrl; // Devolver la URL de la imagen
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      return '';
    }
  }
}