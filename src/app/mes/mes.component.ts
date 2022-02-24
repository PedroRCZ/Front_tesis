import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Medidor } from '../models/medidor.model';
import { FechaServices } from '../servicios/fecha.services'
import { MedidorServices } from '../servicios/medidor-dia.services';
import jsPDF from 'jspdf';

import html2canvas from 'html2canvas';

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

  piso: number;
  fechaMax: string;
  fechaMin: string;

  pisoMostrar: string;

  reporteD: any = [];

  downloadPDF(){
    const DATA : any = document.getElementById('htmlData');
    const doc = new jsPDF('p' , 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3,
    };

    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_reporte.pdf`);
    });
  }

  constructor(
        private _medidorService: MedidorServices,
        private _fechaServices: FechaServices,
        private route: ActivatedRoute) {
     }

  ngOnInit(): void {

    this.piso = this.route.snapshot.params['id'];
    this.pisoSelect()
    this.mostrarFecha();
    this.mostrarKw("2022-02-01","2022-02-28");// ver si se mopdifia
    this.reporte("2022-02-01","2022-02-28")
    this.mostrarOcupacion("2022-02-01","2022-02-28");// ver si se mopdifia
    this.getMedidorMes("2022-02-01","2022-02-28");// chart.js
  }

  DateSelect : any;

  fechaEscogida(){
    this.graph = [];
    this.graphIntesidad= [];
    this.graphPotencia = [];
    let anio = this.DateSelect.split('-')[0]
    let mes = this.DateSelect.split('-')[1]
    let dia = new Date(anio, mes, 0).getDate();
    this.mostrarKw(this.DateSelect+"-01",this.DateSelect+"-"+dia)
    this.mostrarOcupacion(this.DateSelect+"-01",this.DateSelect+"-"+dia);// ver si se mopdifia
    this.getMedidorMes(this.DateSelect+"-01",this.DateSelect+"-"+dia);// chart.js
    this.reporte(this.DateSelect+"-01",this.DateSelect+"-"+dia)
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

  reporte(fechaIni: string, fechaFin: string){
    this._medidorService.getMedidorMesReporte(fechaIni+"n"+fechaFin+"n"+this.piso).subscribe(data => {
      if(Object.keys(data).length === 0){
        console.log("no datos");
      }else{
        this.reporteD = data;
        console.log(this.reporteD)
        console.log(this.reporteD[0].voltajel1pro)
      }
    },error =>{
      console.log(error);
    })
  }


  mostrarFecha(){
    this._fechaServices.getFechasMes(this.piso+"").subscribe(data => {
      if(Object.keys(data).length === 0){
        console.log("no datos");
      }else{
        this.fechaMax = data[0].max;
        this.fechaMin = data[0].min;
        console.log(this.fechaMax + " " + this.fechaMin)
      }
    })
  }

  mostrarKw(fechaIni: string, fechaFin: string){
    this._medidorService.getMedidorAnioDatos(fechaIni+"n"+fechaFin+"n"+this.piso).subscribe(data => {
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

  mostrarOcupacion(fechaIni: string, fechaFin: string){  //quizas un promedio
    this._medidorService.getMedidorAnioOcupacion(fechaIni+"n"+fechaFin+"n"+this.piso).subscribe(data => {
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


  getMedidorMes(fechaIni: string, fechaFin: string){
    this._medidorService.getMedidorMes(fechaIni+"n"+fechaFin+"n"+this.piso).subscribe(data => {
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
