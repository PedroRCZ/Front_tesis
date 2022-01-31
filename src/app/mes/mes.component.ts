import { Component, OnInit } from '@angular/core';
import { Medidor } from '../models/medidor.model';
import { MedidorServices } from '../servicios/medidor-dia.services';


@Component({
  selector: 'app-mes',
  templateUrl: './mes.component.html',
  styleUrls: ['./mes.component.css']
})
export class MesComponent implements OnInit {

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

     }

  ngOnInit(): void {

    this.mostrarKw();// ver si se mopdifia
    this.mostrarOcupacion();// ver si se mopdifia


    this.getMedidorMes();// chart.js
  }

  mostrarKw(){
    this._medidorService.getMedidorDiakw("2022-01-01n2022-01-31n1").subscribe(data => {
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

  mostrarOcupacion(){  //quizas un promedio
    this._medidorService.getMedidorDiaOcupacion("2022-01-01n2022-01-31n1").subscribe(data => {
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


  getMedidorMes(){
    this._medidorService.getMedidorMes("2022-01-01n2022-01-31n1").subscribe(data => {
      if(Object.keys(data).length === 0){
        console.log("no datos");
      }else{
        this.listMedidor = data;
        this.fecha = this.listMedidor.map((listMedidor: any) => listMedidor.to_char)
        this.voltaje = this.listMedidor.map((listMedidor: any) => listMedidor.v3ph)
        this.intencidad = this.listMedidor.map((listMedidor: any) => listMedidor.i3ph)
        this.pf3ph = this.listMedidor.map((listMedidor: any) => listMedidor.pf3ph)

        console.log(this.fecha)


        delay(300);

        this.graph = {
          data: [
              { x: this.fecha ,
                y: this.voltaje,
                type: 'box' },
          ],
          layout: {
            title: 'A Fancy Plot',
            /*yaxis: {
              range: [227.5, 230]
            }*/
          }
        };

        this.graphIntesidad = {
          data: [
              { x: this.fecha ,
                y: this.intencidad,
                type: 'box' },
          ],
          layout: {
            title: 'A Fancy Plot',
            /*yaxis: {
              range: [227.5, 230]
            }*/
          }
        };

        this.graphPotencia = {
          data: [
              { x: this.fecha ,
                y: this.pf3ph,
                type: 'box' },
          ],
          layout: {
            title: 'A Fancy Plot',
            /*yaxis: {
              range: [227.5, 230]
            }*/
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
