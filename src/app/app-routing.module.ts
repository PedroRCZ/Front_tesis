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
import { SimulacionFormComponent } from './modulos/simulacion-form/simulacion-form.component';
import { SimulacionListComponent } from './modulos/simulacion-list/simulacion-list.component';


const routes: Routes = [
  {path: '', component: Medidor1Component},
  {path: 'medidores/medidor1', component: Medidor1Component},
  {path: 'medidores/medidor2', component: Medidor2Component},
  {path: 'medidores/medidor3', component: Medidor3Component},
  {path: 'medidores/general', component: GeneralComponent},
  {path: 'medidores/medidor/dia/:id', component:DiaComponent},
  {path: 'medidores/medidor/mes/:id', component:MesComponent},
  {path: 'medidores/medidor/anio/:id', component:AnioComponent},
  {path: 'medidores/medidor2/dia/:id', component:DiaComponent},
  {path: 'medidores/medidor2/mes/:id', component:MesComponent},
  {path: 'medidores/medidor2/anio/:id', component:AnioComponent},
  {path: 'medidores/medidor3/dia/:id', component:DiaComponent},
  {path: 'medidores/medidor3/mes/:id', component:MesComponent},
  {path: 'medidores/medidor3/anio/:id', component:AnioComponent},
  {path: 'medidores/medidor4/dia/:id', component:DiaComponent},
  {path: 'medidores/medidor4/mes/:id', component:MesComponent},
  {path: 'medidores/medidor4/anio/:id', component:AnioComponent},
  {path: 'medidores/simulacion', component:SimulacionListComponent},
  {path: 'medidores/agregar', component:SimulacionFormComponent},
  {path: 'medidores/agregar/:id', component:SimulacionFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
