import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
//import { FacturaComponent } from './factura/factura.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent }, //con esto establecemos que cuando entre al directorio principal (www.direccion.com) cargue el componente HomeComponent que obtuvimos arriba
  { path: 'cliente', component: ClienteComponent },
  { path: 'facturacion', component: FacturacionComponent },
]; //Creamos la ruta

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
