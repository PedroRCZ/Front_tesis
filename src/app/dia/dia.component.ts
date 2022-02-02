import { Component, Input, OnInit, Output } from '@angular/core';
import { MedidorServices } from '../servicios/medidor-dia.services';
import { FechaServices } from '../servicios/fecha.services'
//import {Chart, registerables} from 'node_modules/chart.js'
import { Medidor } from '../models/medidor.model';
import { ActivatedRoute, Router } from '@angular/router';



declare var Plotly: any;

@Component({
  selector: 'app-dia',
  templateUrl: './dia.component.html',
  styleUrls: ['./dia.component.css']
})
export class DiaComponent implements OnInit {

  kw = 0;
  kwPrecio  = 0;
  superficie = 0;
  ocupacion = 0;
  kw_m2 = 0;

  listMedidor: Medidor[] = [];
  fecha: any;
  voltaje: any;
  intencidad: any;
  pf3ph: any;

  graph: any = [];
  graphIntesidad: any = [];
  graphPotencia: any = [];

  piso: number;
  pisoMostrar: string;
  fechaMax: string;
  fechaMin: string;

  constructor(private _medidorService: MedidorServices,
              private _fechaServices: FechaServices,
            private route: ActivatedRoute,
  ) {
    //Chart.register(...registerables);
  }

  ngOnInit(): void {

    this.piso = this.route.snapshot.params['id'];
    this.pisoSelect()
    this.mostrarFecha();
    this.mostrarKw("2022-01-25");
    this.mostrarOcupacion("2022-01-25");
    this.getMedidorDia("2022-01-25");// chart.js


  }

  DateSelect : any;

  fechaEscogida(){
    this.graph = [];
    this.graphIntesidad= [];
    this.graphPotencia = [];
    this.mostrarKw(this.DateSelect);
    this.mostrarOcupacion(this.DateSelect);
    this.getMedidorDia(this.DateSelect);
  }

  pisoSelect(){
    if(this.piso == 1){
      this.pisoMostrar = "Medidor General"
    }
    else if(this.piso == 4){
      this.pisoMostrar = "Piso 1"
    }else{
      this.pisoMostrar = "Piso " + this.piso
    }
  }

  mostrarKw(fecha: string){
    this._medidorService.getMedidorDiakw(fecha+"n"+this.piso).subscribe(data => {
      if(Object.keys(data).length === 0){
        console.log("no datos");
      }else{
        this.kw = data[0].dato;
        this.kwPrecio = data[0].dato * 1.02;
        this.mostrarSuperficie()
      }
    },error =>{
      console.log(error);
    })
  }

  mostrarOcupacion(fecha: string){
    this._medidorService.getMedidorDiaOcupacion(fecha+"n"+this.piso).subscribe(data => {
      if(Object.keys(data).length === 0){
        console.log("no datos");
      }else{
        this.ocupacion = data[0].max;
      }
    },error =>{
      console.log(error);
    })
  }

  mostrarSuperficie(){
    this._medidorService.getMedidorDiaSuperficie(this.piso+"").subscribe(data => {
      if(Object.keys(data).length === 0){
        console.log("no datos");
      }else{
        this.superficie = data[0].metros;
        this.kw_m2 = this.kw / this.superficie
      }
    },error =>{
      console.log(error);
    })
  }


  mostrarFecha(){
    this._fechaServices.getFechas(this.piso+"").subscribe(data => {
      if(Object.keys(data).length === 0){
        console.log("no datos");
      }else{
        this.fechaMax = data[0].max;
        this.fechaMin = data[0].min;
        console.log(this.fechaMax + " " + this.fechaMin)
      }
    })
  }



  getMedidorDia(fecha: string){
    this._medidorService.getMedidorDia(fecha+"n"+this.piso).subscribe(data => {
      if(Object.keys(data).length === 0){
        console.log("no datos");
      }else{
        this.listMedidor = data;
        console.log(data)
        this.fecha = this.listMedidor.map((listMedidor: any) => listMedidor.time)
        this.voltaje = this.listMedidor.map((listMedidor: any) => listMedidor.v3ph)
        this.intencidad = this.listMedidor.map((listMedidor: any) => listMedidor.i3ph)
        this.pf3ph = this.listMedidor.map((listMedidor: any) => listMedidor.pf3ph)



        delay(300);

        this.graph = {
          data: [
              { x: this.fecha ,
                y: this.voltaje,
                type: 'line' },
          ],
          layout: {
            title: 'Voltaje Trifasico',
            yaxis: {
              range: [227.5, 230]
            }
          }
        };

        this.graphIntesidad = {
          data: [
              { x: this.fecha ,
                y: this.intencidad,
                type: 'line' },
          ],
          layout: {
            title: 'Intensidad Trifasica',
            yaxis: {
              range: [40, 87]
            }
          }
        };

        this.graphPotencia = {
          data: [
              { x: this.fecha ,
                y: this.pf3ph,
                type: 'line' },
          ],
          layout: {
            title: 'Potencia Trifasica',
            yaxis: {
              range: [-1.5, 1.5]
            }
          }
        };
      }
    },error =>{
      console.log(error);
    })
  }
}

async function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
