import { Component, OnInit } from '@angular/core';
import { ApiclienteService } from '../services/apicliente.service';
import { Respuesta } from '../Models/response';
import { dialogClienteComponent } from './dialog/dialogcliente.component';

import { AplidatosService } from '../services/aplidatos.service';
import { cliente } from '../Models/cliente';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';



//CADA VEZ QUE CARQUE LA DIRECCIÓN DE CLIENTE, SE VA A EJECUTAR EL PROCESO CODIFICADO ACÁ

//var nEmpresa = prompt("Sobre que empresa requiere información");

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})


export class ClienteComponent implements OnInit {
  
  //Para que funcione el filtro con el nombre de la empresa
  public nombre: string = "" 
  public prueba: any;
  //Creamos una variable pública any que va a almacenar los datos que recuperemos del método get
  public lst: any;

  //Arreglo de string para especificar las columnas que se van a mostrar
  //public columnas: string[] = [ "id", "empresa", "ciudad", "nit", "total", "subtotal", "iva", "retencion", "estado", "pago", "fechaCreacion", "fechaPago", "editar" ];
  public columnas: string[] = ["empresa", "ciudad", "nit", "email", "encargado", "editar"];

  constructor(
    private apiCliente: ApiclienteService, //El appiclienteservice es la clase que creamos en apicliente.service.ts Así la inyectamos. Con esto básicamente estamos escribiendo todo lo que dice en apicliente. Eso nos ayuda a reciclar nuestras clases.
    private apiDatos: AplidatosService,
    //Creamos un dialog
    public dialog: MatDialog,
    public snackbar: MatSnackBar,

    ) {
    //Siempre que regresemos un observable se necesita un método suscribir
   /*
      apiCliente.getCliente().subscribe(Response => {
      console.log(Response);
    }) //response representa el elemento que me regresó el servicio y que es de tipo response
    */
  } 

  ngOnInit(): void {
    //Hacemos que se ejecute el método getClientes
    this.getClientes(""); //inicializamos nuestro método teniendo como gcliente un string sin ninguna cadena de texto.
  }

  //Creamos un método para poder refrescar nuestros listados y que no dependa del constructor
  getClientes(gcliente: string) {

    //ESTA ES LA API PARA LOS CLIENTES
    this.apiDatos.getCliente(gcliente).subscribe(cliente => { /*Con el this especificamos que es el objeto que creamos en el constructor cuando inyectamos apiclient */
      this.lst = cliente;
      console.log(cliente);
    })

  }



  filtro() //Función para darle el uso de filtro al botón de cliente component
  {
    let snackBarFiltro: any

    //EL FILTRO SE EJECUTA TAN PRONTO SE ACTIVA LA SNACKBAR
    snackBarFiltro = this.snackbar.open('Filtrando por ubicación: ' + this.nombre, '', { duration: 1500 });
    snackBarFiltro.afterDismissed().subscribe(() => {
      this.getClientes(this.nombre);
      
    });
  }

  editar(datos: cliente) {

    console.log("estos son los datos de cliente" + datos);
    console.log(datos);
    console.log(datos.id);
    const dialogRef = this.dialog.open(dialogClienteComponent, {
      width: '600',
      data: datos //con este atributo pasamos los datos que obtuvimos
    })

    dialogRef.afterClosed().subscribe(r => {
      console.log(r);
      //snackBarRef = this.snackbar.open('Hemos incluido al nuevo usuario. Actualizando...', '', { duration: 1500 });
      this.getClientes(this.nombre);

    });
    
  }// fin editar

  openAdd() {
    //let snackBarRef: any;
      
    const dialogRef = this.dialog.open(dialogClienteComponent, {
      width: '600'
    })
    //Una vez que se cierre el cuadro de diálogo va a ejecutar:
    //Estamos enviando un string por .close. Podríamos usar este string para programar un snackbar diferente en función del nombre, pero probablemente las personas quieran ingresar mas de un usuario, así que no vamos a cerrar el cuadro de dialogo tan pronto como se agregue el nuevo cliente
    dialogRef.afterClosed().subscribe(r => {
      console.log(r);
      //snackBarRef = this.snackbar.open('Hemos incluido al nuevo usuario. Actualizando...', '', { duration: 1500 });
      this.getClientes(this.nombre);

    });//fin dialogref*/
    

  }

  delete(datos:cliente) {
    
    this.apiDatos.delete(datos.id).subscribe(cliente => { /*Con el this especificamos que es el objeto que creamos en el constructor cuando inyectamos apiclient */
      this.lst = cliente;
      console.log(cliente);
    })

    let snackBarRef: any;
    snackBarRef = this.snackbar.open(`Hemos eliminado a ${datos.empresa} correctamente.`, '', { duration: 1500 });

    //Cuando se cierra el snackbar se actualiza la lista
    snackBarRef.afterDismissed().subscribe(() => {
      this.getClientes(this.nombre);
      console.log('The snack-bar was dismissed');
    });

  }


}



