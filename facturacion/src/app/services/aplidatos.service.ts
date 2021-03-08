//Este servicio tiene la responsabilidad de conectarse a los servicio del cliente Para ello importamos el HttpClient
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//Importamos nuestra clase cliente
import { cliente } from '../Models/cliente';

const httpOption = {  //Estas epecificaciones sirven para que cuando hagamos una petición por post enviamos estos encabezados
  headers: new HttpHeaders({ // headers es un tipo de objeto de HttpHeaders
    'Content-Type': 'application/json' //Damos el content type del encabezado de una solicitud http
  } //Con los corchetes especificamos que es un objeto dentro del atributo en el que está el objeto.
  ) //Con los paréntesis agregamos su inicialización
}

@Injectable({
  providedIn: 'root'
})
export class AplidatosService {

  url: string = 'https://localhost:5001/api/Cliente';
  constructor(private _http: HttpClient) {

  }

  getCliente(nEmpresa: string): Observable<cliente> //El tipo de dato que obtiene Observable es Respuesta, que equivale a la respuesta que escribimos en response.ts
  { //Obtenemos el dato que el tipo Response va a regresar
    console.log('pasamos por getcliente');
    console.log(nEmpresa)
    return this._http.get<cliente>(`${this.url}/${nEmpresa}`);
  }

  edit(estado: cliente): Observable<cliente> {
    console.log("Entramos a edit por medio del clickeo en cambiar..");
    console.log(estado);
    console.log("el anterior es el dato recibido")
    return this._http.put<cliente>(this.url, estado, httpOption); //El tipo estado indica que pasamos una id y los datos a corregir

  }

  add(cliente: cliente): Observable<cliente> 
  {
    return this._http.post<cliente>(this.url, cliente, httpOption); //Especifico que tipo de respuesta del metodo post vamos a cargar, y enviamos la url, el cliente y el tipo de opcion de http
  }

}
