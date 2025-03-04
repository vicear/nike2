import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css'],
  imports: [CommonModule], 
})
export class ListaProductosComponent implements OnInit {
  productos: any[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    this.productos = this.productosService.obtenerProductos();
  }
}
