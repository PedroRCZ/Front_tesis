import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Medidor3Component } from './medidor3/medidor3.component';
import { Medidor2Component } from './medidor2/medidor2.component';
import { Medidor1Component } from './medidor1/medidor1.component';
import { GeneralComponent } from './general/general.component';
import { DiaComponent } from './dia/dia.component';
import { MedidorServices } from './servicios/medidor-dia.services';

import { HttpClientModule } from '@angular/common/http';

import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { MesComponent } from './mes/mes.component';
import { AnioComponent } from './anio/anio.component';
import { MenuTiempoComponent } from './modulos/menu-tiempo/menu-tiempo.component';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    Medidor3Component,
    Medidor2Component,
    Medidor1Component,
    GeneralComponent,
    DiaComponent,
    MesComponent,
    AnioComponent,
    MenuTiempoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    PlotlyModule,
  ],
  providers: [MedidorServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
