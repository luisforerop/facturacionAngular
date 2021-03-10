//Es necesario agregar este componente en appmodule

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; //MAT_DIALOG_DATA es una constante que nos permite especificar datos que viene inyectados.
import { MatSnackBar } from '@angular/material/snack-bar';
import { cliente } from '../../Models/cliente';
import { AplidatosService } from '../../services/aplidatos.service';
import { MatDialog } from '@angular/material/dialog';

  
//El @ es un Decorador que permite darle un comportamiento a una clase
@Component({
    templateUrl: 'dialogcliente.component.html'
})
  //Abrimos este componente donde lo queramos tener, que para nuestro caso es en cliente.component


export class dialogClienteComponent {


  public nombre: string = "hola" //Esta variable la usamos para hacer pruebas con ngModel, que vincula una variable con los campos de un formulario. Para usarla se debe agregar FormsModule en app.module y para que quede doblemente (actualización de variables en tiempo real) ligado usamos [(ngModel)]="nombre"
  public nombreBoton: string = "Cancelar";
  public nombreBoton2: string = "Agregar";
  public lst: any;
  public cerrar: number = 1;
  public empresa: string = "";
  public nit: string = "";
  public ciudad: string = "";
  public email: string = "";
  public encargado: string = "";

  constructor(
    public dialogRef: MatDialogRef<dialogClienteComponent>, //Especificamos el tipo de componente, que será el que estamos creando. Haciendo referencia a este mismo dialog podemos manipularlo.
    public apiDatos: AplidatosService ,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public datos:cliente, //Con esto podemos inyectar los datos que estamos enviando desde cliente.component 
  ) {
    if (this.datos !== null) { //Usando el parámetro null sabemos si al abrirse nuestro dialog venía con algún dato inyectado (editar) o no (agregar)
      this.nombreBoton2 = "Actualizar"
      this.empresa = datos.empresa;
      this.nit = datos.nit;
      this.ciudad = datos.ciudad;
      this.email = datos.email;
      this.encargado = datos.encargado;
    }

  }
  close() {
    let snackBarRef: any;
    if (this.cerrar) {
      snackBarRef = this.snackBar.open('Acción cancelada', '', { duration: 1500 });
    }
    this.dialogRef.close("dialogo cerrado");
  }

  //=============CONDICIÓN TERNARIA: Es la herramienta que usamos en el html para que si datos es null escriba "Nuevo Cliente"
  //Es un tipo de if en donde colocamos la condición seguida de un "?" que hace las veces de if, seguido por la acción, y para el else usamos ":" y luego la acción. 

 //Método para agregar clientas. 
  addCliente() {
    //Creamos una const del tipo cliente de la interface del cliente.ts

    let cliente: cliente = this.cargar(); //Ejecutamos cargar para obtener los atributos del objeto
    this.apiDatos.add(cliente).subscribe(i => console.log(`${i} este es i`));
    //PARA ACTUALIZAR DATOS
    let snackBarRef: any;
    //Con esto cambiamos el nombre del botón para indicar salida y eliminamos el contenido de los campos
    this.cerrar = 0;
    this.reset();

    snackBarRef = this.snackBar.open(cliente.empresa + ' agregado con éxito', '', { duration: 1500 });
    
 }

  updateCliente() {
    let cliente: cliente = this.cargar();
    cliente.id = this.datos.id;
    console.log(cliente);
    let snackBarRef: any;
    this.apiDatos.edit(cliente).subscribe(i => console.log(`${i} este es i`));
    snackBarRef = this.snackBar.open(`Los datos de ${cliente.empresa} han sido actualizados con éxito`, '', { duration: 1500 })

    this.cerrar = 0;
    this.reset();
  }

  reset() {
    this.nombreBoton = "Salir";
    this.empresa = "";
    this.nit = "";
    this.ciudad = "";
    this.email = "";
    this.encargado = "";
  }

  cargar() {
    let cliente: cliente = {
      "id": "",
      "empresa": this.empresa,
      "nit": this.nit,
      "ciudad": this.ciudad,
      "email": this.email,
      "encargado": this.encargado
    };
    return cliente;
  }

}
