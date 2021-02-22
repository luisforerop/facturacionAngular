import { Component, OnInit } from '@angular/core';
import { ApiclienteService } from '../services/apicliente.service';
import { Respuesta } from '../Models/response';
import { dialogClienteComponent } from './dialog/dialogcliente.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timer } from 'rxjs';

//CADA VEZ QUE CARQUE LA DIRECCIÓN DE CLIENTE, SE VA A EJECUTAR EL PROCESO CODIFICADO ACÁ

console.log("Hemos entrado");
//var nEmpresa = prompt("Sobre que empresa requiere información");

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})


export class ClienteComponent implements OnInit {
  
  //Para que funcione el filtro con el nombre de la empresa
  public nombre: string = "" 

  //Creamos una variable pública any que va a almacenar los datos que recuperemos del método get
  public lst: any;

  //Arreglo de string para especificar las columnas que se van a mostrar
  public columnas: string[] = [ "id", "empresa", "ciudad", "nit", "total", "subtotal", "iva", "retencion", "estado", "pago", "fechaCreacion", "fechaPago", "editar" ];

  constructor(
    private apiCliente: ApiclienteService, //El appiclienteservice es la clase que creamos en apicliente.service.ts Así la inyectamos. Con esto básicamente estamos escribiendo todo lo que dice en apicliente. Eso nos ayuda a reciclar nuestras clases.
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
    this.apiCliente.getCliente(gcliente).subscribe(Respuesta => { /*Con el this especificamos que es el objeto que creamos en el constructor cuando inyectamos apiclient */
      this.lst = Respuesta;
      console.log(Respuesta);
    })
  }

  filtro() //Función para darle el uso de filtro al botón de cliente component
  {
    //Abrimos nuestro componente dialogcliente
    console.log("oprimio boton")
    //console.log(this.pruebita.pasarNombre)
    const dialogRef = this.dialog.open(dialogClienteComponent, {
     width: '300'
    })
    //Una vez que se cierre el cuadro de diálogo va a ejecutar:
    dialogRef.afterClosed().subscribe(r => { this.getClientes(this.nombre); })
  }

  editar(datos: Respuesta) {

    
    //datos.estado = "Recién procesado"; //Comando para reinicializar todo el ciclo
    
    switch (datos.estado) {
      case "Recién procesado":
        {
          datos.estado = "Primer recordatorio";
          this.snackbar.open('Primer recordatorio enviado', '', { duration: 1500 });
          break;
        }
      case "Primer recordatorio":
        {
          datos.estado = "Segundo recordatorio";
          this.snackbar.open('Segundo recordatorio enviado', '', { duration: 1500 });
          break;
        }
      case "Segundo recordatorio":
        {
          datos.estado = "Desactivado";
          this.snackbar.open('La factura se ha desactivado', '', { duration: 1500 })
          break;
        }
      default: {
        this.snackbar.open('La factura está desactivada', '', { duration: 1500 })

      }
    }/**/

    //Editamos el Json para enviar la modificación del estado

    this.apiCliente.edit(datos).subscribe(i => console.log(`${i} este es i`));

    //Esta sección tiene opción de mejora para verificar si se actualizo el dato o no, ya que en ocasiones la base de datos puede tardar unos milisegundos en actualizar la información. Se puede implementar un ciclo while que repita la próxima instrucción hasta que sea diferente a la que ingresó
    
    this.getClientes(this.nombre);

  }



}
