//Este servicio tiene la responsabilidad de conectarse a los servicio del cliente Para ello importamos el HttpClient
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cliente } from '../Models/cliente';
//Importamos nuestra clase response
import { Respuesta } from '../Models/response';
//import { empresa } from '../cliente/cliente.component';

//Con el content type especificamos que nuestra solicitud puede llevar un json. Esta constante es un objeto
const httpOption = {  //Estas epecificaciones sirven para que cuando hagamos una petición por post enviamos estos encabezados
  headers: new HttpHeaders({ // headers es un tipo de objeto de HttpHeaders
    'Content-Type': 'application/json' //Damos el content type del encabezado de una solicitud http
  } //Con los corchetes especificamos que es un objeto dentro del atributo en el que está el objeto.
  ) //Con los paréntesis agregamos su inicialización
}



@Injectable({ //Esto indica que nuestro servicio es algo que se puede inyectar
  providedIn: 'root'
})

export class ApiclienteService {
    //Agregamos la url a la cual nos vamos a conectar
  //public prueba = '/Exito';
  
  url: string = 'https://localhost:5001/api/Factura';
  constructor(
    //Inyectamos httpclient
    private _http: HttpClient //Objeto para hacer solicitudes
  ) {
  }
  //Siempre que regresemos un observable se necesita un método suscribir

  //MÉTODO PARA OBTENER DATOS
  getCliente(nEmpresa: string): Observable<Respuesta> //El tipo de dato que obtiene Observable es Respuesta, que equivale a la respuesta que escribimos en response.ts
  { //Obtenemos el dato que el tipo Response va a regresar
    nEmpresa = "/" + nEmpresa; 
    console.log('pasamos por getcliente');
    console.log(nEmpresa)
    return this._http.get<Respuesta>(this.url + nEmpresa); //Usamos this.url porque es donde va a hacer la solicitud, y este fue el valor que cargamos inicialmente
    //otra alternativa para escribir lo que está en los paréntesis es  `${this.url}/${nEmpresa}`, lo que nos ahorra algunas líneas de código
  }

  //MÉTODO DE EDICIÓN DE DATOS
  edit(estado: Respuesta): Observable<Respuesta> { 
    //console.log("Entramos a edit por medio del clickeo en cambiar..");
    //console.log(estado);
    //console.log("el anterior es el dato recibido")
    return this._http.put<Respuesta>(this.url, estado, httpOption); //El tipo estado indica que pasamos una id y los datos a corregir

  }


  //Método para agregar datos. 
  add(factura: Respuesta): Observable<Respuesta> //El método add va a recibir un objeto llamado cliente del tipo cliente, que es la intarface |Será un observable que devuelve un objeto Respuesta 
  {
    return this._http.post<Respuesta>(this.url, factura, httpOption); //Especifico que tipo de respuesta del metodo post vamos a cargar, y enviamos la url, el cliente y el tipo de opcion de http
  }/**/

  delete(id: string): Observable<Respuesta> {
    console.log("ingresamos a delete clientes por apidatos");
    return this._http.delete<Respuesta>(`${this.url}/${id}`, httpOption);
  }

  
}
//ESTE COMPONENTE LO VAMOS A INVOCAR DESDE NUESTRO COMPONENTE CLIENTE
