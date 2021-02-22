//Es necesario agregar este componente en appmodule

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { cliente } from '../../Models/cliente';
import { ApiclienteService } from '../../services/apicliente.service';
import { MatDialog } from '@angular/material/dialog';
import { ClienteComponent } from '../cliente.component';



  
//El @ es un Decorador que permite darle un comportamiento a una clase
@Component({
    templateUrl: 'dialogcliente.component.html'
})
  //Abrimos este componente donde lo queramos tener, que para nuestro caso es en cliente.component


export class dialogClienteComponent {
  
  public nombre: string = ""  
  constructor(
    public dialogRef: MatDialogRef<dialogClienteComponent>, //Especificamos el tipo de componente, que será el que estamos creando. Haciendo referencia a este mismo dialog podemos manipularlo.
    public apiCliente: ApiclienteService,
    public snackBar: MatSnackBar,
    
  ) {
    //this.nombre

  }
  close() {
    this.dialogRef.close();
  }


/* //Método para agregar clientas. Se había modificado para crear un filtro, pero se reemplazó por otro método.
  addCliente() {
    //Creamos una const del tipo cliente de la interface del cliente.ts
    const cliente: string = "monolegal";
    console.log(cliente);
    this.apiCliente.getCliente(cliente).subscribe(this.dialogRef.close)
    this.dialogRef.close();
    //dialogRef.afterClosed().subscribe(r => { this.getClientes("Gobernación"); })

    //this.cliente.getClientes(this.nombre);
 }*/


}
