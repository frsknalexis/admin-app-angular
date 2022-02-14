import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { AuthGuard } from "../guards/auth.guard";

const appRoutes: Routes = [
  { path: 'dashboard',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    canLoad: [ AuthGuard ],
    loadChildren: () => import('./child-routing.module')
      .then((m) => m.ChildRoutingModule)
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule {  }
