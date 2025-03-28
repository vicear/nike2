import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,  private authService: AuthService ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['user', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password, confirmPassword, role } = this.registerForm.value;

      // ✅ Validar que las contraseñas coincidan antes de enviar
      if (password !== confirmPassword) {
        console.error("Las contraseñas no coinciden");
        return;
      }

      // ✅ Llamar al servicio para registrar al usuario
      this.authService.register({ name, email, password, role }).subscribe(
        response => {
          console.log("Registro exitoso", response);
        },
        error => {
          console.error("Error en el registro", error);
        }
      );
    }
  }
}