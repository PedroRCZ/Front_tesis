import { Component, OnInit, Output } from '@angular/core';
import { MedidorServices } from '../servicios/medidor-dia.services';
//import {Chart, registerables} from 'node_modules/chart.js'
import { Medidor } from '../models/medidor.model';



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

  constructor(
    private _medidorService: MedidorServices
  ) {
    //Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.mostrarKw();
    this.mostrarOcupacion();


    this.getMedidorDia();// chart.js


  }

  mostrarKw(){
    this._medidorService.getMedidorDiakw("2022-01-25n2022-01-26n1").subscribe(data => {
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

  mostrarOcupacion(){
    this._medidorService.getMedidorDiaOcupacion("2022-01-25n2022-01-26n1").subscribe(data => {
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
    this._medidorService.getMedidorDiaSuperficie("1").subscribe(data => {
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
  getMedidorDia(){
    this._medidorService.getMedidorDia("2022-01-25n2022-01-26n1").subscribe(data => {
      if(Object.keys(data).length === 0){
        console.log("no datos");
      }else{
        this.listMedidor = data;
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
            title: 'A Fancy Plot',
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
            title: 'A Fancy Plot',
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
            title: 'A Fancy Plot',
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
