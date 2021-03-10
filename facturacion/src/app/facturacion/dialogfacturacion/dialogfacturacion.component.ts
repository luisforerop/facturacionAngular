//Es necesario agregar este componente en appmodule

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Respuesta } from '../../Models/response';
import { ApiclienteService } from '../../services/apicliente.service';
import { AplidatosService } from '../../services/aplidatos.service';
import { MatDialog } from '@angular/material/dialog';
import { FacturacionComponent } from '../facturacion.component';

@Component({
  selector: 'app-dialogfacturacion',
  templateUrl: './dialogfacturacion.component.html',
  styleUrls: ['./dialogfacturacion.component.css']
})



export class DialogfacturacionComponent implements OnInit {

  public checked = false;

  public listEmpresas: any = [];//Cargamos los nombres de las empresas
  public infoEmpresa: any =[];
  public empresaSelect: any;//Asignamos el nombre de la empresa deseada

  public empresa: string = "";
  public ciudad: string = "Tunja";
  public nit: string = ""; // this.nit;
  public subtotal: any; // this.subtotal;
  public iva: any; // this.iva;
  public retencion: any; // this.retencion;
  public fechaCreacion: string = ""; // "";
  public estado: string = "Recién procesado"; // this.estado;
  public pago: any = false; // this.pago;
  public fechaPago: string = ""; // "";
  public total: any; // this.total;

  public nombreBoton: string = "Cancelar";
  public cerrar: number = 1;

  constructor(
    public dialogRef: MatDialogRef<DialogfacturacionComponent>, //Especificamos el tipo de componente, que será el que estamos creando. Haciendo referencia a este mismo dialog podemos manipularlo.
    public apiCliente: ApiclienteService,
    public apiDatos: AplidatosService,
    public snackBar: MatSnackBar,

  ) {
    //this.nombre

  }

  close() {
    let snackBarRef: any;
    if (this.cerrar) {
      snackBarRef = this.snackBar.open('Acción cancelada', '', { duration: 1500 });
    }
    this.dialogRef.close("dialogo cerrado");
  }

  ngOnInit(): void {
    //Inicializamos retención y subtotal en 0
    this.obtenerFecha();
    this.retencion = 0;
    this.subtotal = 0;
    this.getEmpresa();

  }

  addFactura() {
    //Creamos una const del tipo cliente de la interface del cliente.ts

    let snackBarRef: any;
    let factura: Respuesta = this.cargar(); //Ejecutamos cargar para obtener los atributos del objeto
    //VALIDACIÓN
    if (factura.subtotal == 0 || factura.empresa == "") {
      snackBarRef = this.snackBar.open(`No llenaste todo el formulario, revisa los campos`, '', { duration: 1500 });
    }
    else {
      this.apiCliente.add(factura).subscribe(i => console.log(`${i} este es i`));
      this.cerrar = 0;//Con esto cambiamos el nombre del botón para indicar salida y eliminamos el contenido de los campos
      snackBarRef = this.snackBar.open(`Se ha creado una factura a nombre de ${factura.empresa} por valor de ${factura.total} COP`, '', { duration: 1500 });
      this.reset();

    }
  }

  reset() {

    this.nombreBoton = "Salir";
    this.empresaSelect = "";
    this.empresa = "";
    this.ciudad = "";
    this.nit = "";
    this.total = 0;
    this.iva = 0;
    this.retencion = 0;
    this.subtotal = 0;
    this.fechaCreacion = "";
    this.fechaPago = "";
    this.obtenerFecha();
    this.checked = false;
  }

  cargar() {
    //DETERMINAMOS FECHA DE PAGO
    if (this.checked) {
      this.fechaPago = this.fechaCreacion;
      this.pago = this.checked;
      this.estado = "Pagado";
    }
    else { this.fechaPago = "Sin pago registrado" }

    let factura: Respuesta = {
      "id": "",
      "empresa": this.empresa,
      "ciudad": this.ciudad,
      "nit": this.nit,
      "total": this.total,
      "iva": this.iva,
      "retencion": this.retencion,
      "subtotal": this.subtotal,
      "fechaCreacion": this.fechaCreacion, //falta por obtener
      "estado": this.estado, //Siempre es recién procesado
      "pago": this.pago, //inicialmente es false
      "fechaPago": this.fechaPago //falta por obtener

    };
    return factura;
    
  }

  getEmpresa() {
    this.apiDatos.getCliente("").subscribe(empresas => {
    this.infoEmpresa = empresas;
      
      for (var item of this.infoEmpresa) {
        this.listEmpresas.push(item.empresa);
      }
      //console.log("esta es la lista empresas" + this.listEmpresas);
    })
  }

  
  obtenerDatosEmpresa() {
    console.log("entramos a cambio")

    for (var item of this.infoEmpresa) {
      if (this.empresaSelect == item.empresa) {
        console.log(item);
        this.empresa = item.empresa;
        this.ciudad = item.ciudad;
        this.nit = item.nit;
      }
      //this.listEmpresas.push(item.empresa);
    }
  }

  calculo() {
    //VALIDAMOS VALORES
    console.log(typeof (this.retencion) + " " + this.retencion);
    this.iva = Math.round(this.subtotal * 0.19);
    this.retencion = parseInt(this.retencion);
    this.subtotal = parseInt(this.subtotal);
    this.total = this.iva + this.subtotal + this.retencion;
    console.log(typeof(this.iva) + typeof(this.subtotal) + typeof(this.retencion))
  }

  obtenerFecha() {
    let fecha = new Date();
    let year = fecha.getFullYear();
    let day = fecha.getDate();
    let month = fecha.getMonth();
    this.fechaCreacion = `${day}/${month + 1}/${year}`;
 
  }


}
