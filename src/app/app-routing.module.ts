import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NopagefoundComponent } from "./nopagefound/nopagefound.component";
import { PagesRoutingModule } from "./pages/pages-routing.module";
import { AuthRoutingModule } from "./auth/auth-routing.module";

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {  }
