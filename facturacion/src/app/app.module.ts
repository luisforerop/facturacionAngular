import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Importamos el sidenav de material
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomeComponent } from './home/home.component';
import { ClienteComponent } from './cliente/cliente.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { dialogClienteComponent } from './cliente/dialog/dialogcliente.component';
import { DialogfacturacionComponent } from './facturacion/dialogfacturacion/dialogfacturacion.component';
//import { dialogFacturaComponent } from './factura/dialog/dialogfactura.component';

//IMPORTAMOS MÓDULO PARA HACER PETICIONES HTTP
import { HttpClientModule } from '@angular/common/http';
//Importamos las tablas de material
import { MatTableModule } from '@angular/material/table';
//Importamos el cuadro de dialogo
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

import { MatSelectModule } from '@angular/material/select'; //Habilitamos la creación de un select o lista desplegable

import { MatCheckboxModule } from '@angular/material/checkbox';

//Importamos para el formulario
import { FormsModule } from '@angular/forms';
//import { Component } from '@angular/core';

//LAS DEPENDENCIAS SON INYECTADAS POR MEDIO DE imports A LOS QUE ESTÉN AGREGADOS EN declarations, así que si queremos inyectar algún componente que creamos en otro, tenemos que agregarlo en imports

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClienteComponent,
    dialogClienteComponent,
    FacturacionComponent,
    DialogfacturacionComponent,
    //dialogFacturaComponent
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
    MatDividerModule,
    MatSelectModule,

    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

