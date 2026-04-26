import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { ClientesComponent } from './pages/clientes/clientes';
import { ProductosComponent } from './pages/productos/productos';
import { PedidosComponent } from './pages/pedidos/pedidos';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: '**', redirectTo: '' }
];