import { Component, OnInit, Signal } from '@angular/core';
import { ProductosService } from '../services/products.service';
import { CommonModule } from '@angular/common';
import { product } from '../interface/productos'

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css'],
  imports: [CommonModule], 
})
export class ListaProductosComponent implements OnInit {
  productos: Signal<product[]>;

  constructor(private productosService: ProductosService) {
    this.productos = this.productosService.loadProducts();
  }
  ngOnInit() {
    this.productos = this.productosService.loadProducts();
  }
}
