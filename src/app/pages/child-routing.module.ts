import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Grafica1Component } from "./grafica1/grafica1.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { ProfileComponent } from "./profile/profile.component";
import { UsuariosComponent } from "./mantenimientos/usuarios/usuarios.component";
import { AdminGuard } from "../guards/admin.guard";
import { HospitalesComponent } from "./mantenimientos/hospitales/hospitales.component";
import { MedicosComponent } from "./mantenimientos/medicos/medicos.component";
import { MedicoComponent } from "./mantenimientos/medicos/medico.component";
import { SearchComponent } from "./search/search.component";

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
  { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Grafica #1' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de Cuenta' } },
  { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
  { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de Usuario' } },
  { path: 'users', component: UsuariosComponent, canActivate: [ AdminGuard ], data: { titulo: 'Usuarios' } },
  { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales' } },
  { path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos' } },
  { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Medicos' } },
  { path: 'search/:searchText', component: SearchComponent, data: { titulo: 'Busqueda' } }
];

@NgModule({
  imports: [
    RouterModule.forChild(childRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ChildRoutingModule { }
