import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa esto


import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';

export const routes: Routes = [

    { path: '', component: HomeComponent }, // Redirige la raíz al Home
    { path: 'form', component: FormComponent},
    { path: 'products', component: ListaProductosComponent},
    { path: 'CommonModule', component: CommonModule}

  ];


  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }