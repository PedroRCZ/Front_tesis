import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnioComponent } from './anio/anio.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DiaComponent } from './dia/dia.component';
import { GeneralComponent } from './general/general.component';
import { Medidor1Component } from './medidor1/medidor1.component';
import { Medidor2Component } from './medidor2/medidor2.component';
import { Medidor3Component } from './medidor3/medidor3.component';
import { MesComponent } from './mes/mes.component';


const routes: Routes = [
  {path: 'medidores/medidor1', component: Medidor1Component},
  {path: 'medidores/medidor2', component: Medidor2Component},
  {path: 'medidores/medidor3', component: Medidor3Component},
  {path: 'medidores/general', component: GeneralComponent},
  {path: 'medidores/medidor1/dia', component:DiaComponent},
  {path: 'medidores/medidor1/mes', component:MesComponent},
  {path: 'medidores/medidor1/anio', component:AnioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
