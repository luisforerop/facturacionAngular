//Aqui ponemos todos los re

export interface Respuesta {
  //Para analizar los atributos que enviamos desde el backend
  id: string; //
  empresa: string;
  ciudad: string; //
  nit: number; //
  total: number;//
  subtotal: number;
  iva: number; //
  retencion: number; //
  fechaCreacion: string;
  estado: string;
  pago: boolean;
  fechaPago: string;// 


}
