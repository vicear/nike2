import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/products.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css'],
})
export class ListaProductosComponent implements OnInit {
  productos: any[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    this.productos = this.productosService.obtenerProductos();
  }
}
