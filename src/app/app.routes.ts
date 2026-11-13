import { Routes } from '@angular/router';
import {HomeComponent} from './componentes/home-component/home-component';
import {ProveedorListarComponent} from './componentes/proveedor-listar-component/proveedor-listar-component';
import {ProveedorNuevoEditComponent} from './componentes/proveedor-nuevo-edit-component/proveedor-nuevo-edit-component';
import {AcercaComponent} from './componentes/acerca-component/acerca-component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'proveedores', component: ProveedorListarComponent},
  { path: 'nuevo-edit', component: ProveedorNuevoEditComponent},
  { path: 'nuevo-edit/:id', component: ProveedorNuevoEditComponent},
  { path: 'acerca', component: AcercaComponent},
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];
