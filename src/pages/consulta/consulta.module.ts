import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultaPage } from './consulta';

@NgModule({
  declarations: [
    ConsultaPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultaPage),
  ],
  exports: [
    ConsultaPage
  ]
})
export class ConsultaPageModule {}
