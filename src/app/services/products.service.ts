import { Injectable, Signal, signal } from '@angular/core';
import { product } from '../interface/productos';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ProductosService {
  private apiUrl = "http://localhost:5000/api";





  
 

  public products = signal<product[]>([]);
  constructor(private http: HttpClient) {}


   // Método para obtener productos
   obtenerProductos(): Observable<product[]> {
    return this.http.get<product[]>(`${this.apiUrl}/productos`); // Esperamos una lista de productos
  }

  loadProducts(): Signal<product[]> {
    this.obtenerProductos().subscribe({
      next: (productos) => {
        this.products.set(productos); // Actualizamos la señal con la respuesta de la API
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      },
    });

    return this.products; // Retornamos la señal actualizada
  }

  addProduct(product: product): void {
    console.log("Creando producto:", product)
 
 
    this.http.post<{ message: string; product: product }>(`${this.apiUrl}/productos`, product).subscribe({
      next: (response) => {
        // Actualizar la lista de productos añadiendo el nuevo
        this.products.update((products) => [...products, response.product])

      },
      error: (err) => {

        console.error("Error al crear el producto:", err)
      },
    })
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