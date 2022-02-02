import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Medidor } from '../models/medidor.model';
import { FechaServices } from '../servicios/fecha.services';
import { MedidorServices } from '../servicios/medidor-dia.services';


@Component({
  selector: 'app-anio',
  templateUrl: './anio.component.html',
  styleUrls: ['./anio.component.css']
})
export class AnioComponent implements OnInit {

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

  anioSelec: string  = '2021';
  anio = [{to_char: 2021},{to_char: 2022}];

  constructor(
    private _medidorService: MedidorServices,
    private _fechaServices: FechaServices,
    private route: ActivatedRoute) {
     }

  ngOnInit(): void {

    this.piso = this.route.snapshot.params['id'];
    this.mostrarFecha();
    this.pisoSelect()
    this.mostrarKw(this.anioSelec);
    this.mostrarOcupacion(this.anioSelec);
    this.getMedidorAnio(this.anioSelec);
  }

  fechaEscogida(){
    this.graph = [];
    this.graphIntesidad= [];
    this.graphPotencia = [];
    this.mostrarKw(this.anioSelec);
    this.mostrarOcupacion(this.anioSelec);
    this.getMedidorAnio(this.anioSelec);
  }


  mostrarFecha(){
    this._fechaServices.getFechasAnio(this.piso+"").subscribe(data => {
      if(Object.keys(data).length === 0){
        console.log("no datos");
      }else{
        this.anio = data;
        console.log(this.anio)
      }
    })
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
    this._medidorService.getMedidorAnioDatos(fecha+"-01-01n"+fecha+"-12-31n"+this.piso).subscribe(data => {
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

  mostrarOcupacion(fecha: string){  //quizas un promedio
    this._medidorService.getMedidorAnioOcupacion(fecha+"-01-01n"+fecha+"-12-31n"+this.piso).subscribe(data => {
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
    this._medidorService.getMedidorDiaSuperficie(""+this.piso).subscribe(data => {
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


  getMedidorAnio(fecha: string){//fecha
    this._medidorService.getMedidorAnio(fecha+"-01-01n"+fecha+"-12-31n"+this.piso).subscribe(data => {
      if(Object.keys(data).length === 0){
        console.log("no datos");
      }else{
        this.listMedidor = data;
        this.fecha = this.listMedidor.map((listMedidor: any) => listMedidor.to_char)
        this.voltaje = this.listMedidor.map((listMedidor: any) => listMedidor.v3ph)
        this.intencidad = this.listMedidor.map((listMedidor: any) => listMedidor.i3ph)
        this.pf3ph = this.listMedidor.map((listMedidor: any) => listMedidor.pf3ph)
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
