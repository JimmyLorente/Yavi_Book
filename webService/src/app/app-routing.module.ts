import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './pages/listar/listar.component';

const routes: Routes = [
  {
    path: 'yavifood', component: AdminComponent,
    children: [
      { path: 'clientes', component: ListarComponent, canActivate: [AuthGuard] },
      { path: 'crud', component: PlatillosComponent, canActivate: [AuthGuard] },
      { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
      { path: 'ordenes', component: OrdersComponent, canActivate: [AuthGuard] },
      { path: 'perfil', component: ProfileComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
