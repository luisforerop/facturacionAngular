//Es necesario agregar este componente en appmodule

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { cliente } from '../../Models/cliente';
import { ApiclienteService } from '../../services/apicliente.service';
import { MatDialog } from '@angular/material/dialog';
import { FacturacionComponent } from '../facturacion.component';

@Component({
  selector: 'app-dialogfacturacion',
  templateUrl: './dialogfacturacion.component.html',
  styleUrls: ['./dialogfacturacion.component.css']
})
export class DialogfacturacionComponent /*implements OnInit*/ {

  public nombre: string = ""
  constructor(
    public dialogRef: MatDialogRef<DialogfacturacionComponent>, //Especificamos el tipo de componente, que será el que estamos creando. Haciendo referencia a este mismo dialog podemos manipularlo.
    public apiDatos: ApiclienteService,
    public snackBar: MatSnackBar,

  ) {
    //this.nombre

  }
  close() {
    this.dialogRef.close();
  }
  /*ngOnInit(): void {
  }*/

  

}
