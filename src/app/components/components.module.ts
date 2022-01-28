import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IncrementadorComponent } from "./incrementador/incrementador.component";
import { FormsModule } from "@angular/forms";
import { DonaComponent } from './dona/dona.component';
import { NgChartsModule } from "ng2-charts";
import { ModalImageComponent } from './modal-image/modal-image.component';

@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    ModalImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports: [
    IncrementadorComponent,
    DonaComponent,
    ModalImageComponent
  ]
})
export class ComponentsModule {  }
