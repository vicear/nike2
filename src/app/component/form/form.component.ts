import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductosService } from '../../services/products.service';
import { product } from '../../interface/productos';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  MyNewForm: FormGroup;
  selectedFile: File | null = null; // Archivo de imagen seleccionado

  constructor(private service: ProductosService, private fb: FormBuilder) {
    this.MyNewForm = this.fb.group({
      id: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      precio: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      descripcion: [''],
      tipoProducto: ['', [Validators.required]],
      productoOferta: [false], 
      img: [''] // Se usará para almacenar la URL de la imagen
    });
  }

  // Manejo del archivo de imagen
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  async onSubmit(): Promise<void> {
    if (this.MyNewForm.valid) {
      let imageUrl = '';

      // Si hay una imagen, subirla antes de enviar el producto
      if (this.selectedFile) {
        imageUrl = await this.service.uploadImage(this.selectedFile);
      }

      const newProduct: product = {
        ...this.MyNewForm.value,
        img: imageUrl // Guardar la URL de la imagen en el producto
      };

      // Agregar el producto usando Signals
      this.service.addProduct(newProduct);

      console.log('Producto agregado:', newProduct);
    }
  }
}
