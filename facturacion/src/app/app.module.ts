import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Importamos el sidenav de material
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomeComponent } from './home/home.component';
import { ClienteComponent } from './cliente/cliente.component';
import { dialogClienteComponent } from './cliente/dialog/dialogcliente.component';
//IMPORTAMOS MÓDULO PARA HACER PETICIONES HTTP
import { HttpClientModule } from '@angular/common/http';
//Importamos las tablas de material
import { MatTableModule } from '@angular/material/table';
//Importamos el cuadro de dialogo
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
//Importamos para el formulario
import { FormsModule } from '@angular/forms';
//import { Component } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClienteComponent,
    dialogClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    //PARA HACER LAS PETICIONES
    HttpClientModule,
    //Elementos para el aspecto visual
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    //Formularios
    FormsModule,
   // Component,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

