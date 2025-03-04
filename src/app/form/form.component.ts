import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  MyNewForm: FormGroup;
  selectedFile: File | null = null; // Variable para almacenar el archivo seleccionado

  constructor(private service: ProductsService, private fb: FormBuilder) {
    this.MyNewForm = this.fb.group({
      id: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      precio: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      descripcion: [''],
      tipoProducto: ['', [Validators.required]],
      productoOferta: [false], // Cambiado el nombre correcto y definido como booleano
      img: [null] // Inicialmente sin imagen
    });
  }

  // Manejo del archivo de imagen
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.MyNewForm.patchValue({ img: file });
      this.MyNewForm.get('img')?.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.MyNewForm.valid) {
      const formData = new FormData();
      formData.append('id', this.MyNewForm.value.id);
      formData.append('nombre', this.MyNewForm.value.nombre);
      formData.append('precio', this.MyNewForm.value.precio);
      formData.append('descripcion', this.MyNewForm.value.descripcion);
      formData.append('tipoProducto', this.MyNewForm.value.tipoProducto);
      formData.append('productoOferta', this.MyNewForm.value.productoOferta);
      if (this.selectedFile) {
        formData.append('img', this.selectedFile);
      }

      // Enviar datos al servicio
      this.service.addProduct(this.MyNewForm.value);

      // Mostrar datos en consola
      console.log('Producto agregado:', this.MyNewForm.value);
      console.log('Archivo seleccionado:', this.selectedFile);
    }
  }
}
