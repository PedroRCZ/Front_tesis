import { Component, Input, OnInit, Output } from '@angular/core';
import { MedidorServices } from '../servicios/medidor-dia.services';
import { FechaServices } from '../servicios/fecha.services'
//import {Chart, registerables} from 'node_modules/chart.js'
import { Medidor } from '../models/medidor.model';
import { ActivatedRoute, Router } from '@angular/router';

import jsPDF from 'jspdf';

import html2canvas from 'html2canvas';



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
  graphVtri: any = [];
  graphIntesidad: any = [];
  graphIntesidadTri: any = [];
  graphPotencia: any = [];
  graphPotenciaTri: any = [];
  graphFrec: any = [];

  piso: number;
  pisoMostrar: string;
  fechaMax: string;
  fechaMin: string;

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

  constructor(private _medidorService: MedidorServices,
              private _fechaServices: FechaServices,
            private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.piso = this.route.snapshot.params['id'];
    this.pisoSelect()
    this.mostrarFecha();
    this.mostrarKw("2022-01-25");
    this.mostrarOcupacion("2022-01-25");
    this.reporte("2022-01-25")
    this.getMedidorDia("2022-01-25");// chart.js
  }

  DateSelect : any;

  fechaEscogida(){
    this.graph = [];
    this.graphIntesidad= [];
    this.graphPotencia = [];
    this.mostrarKw(this.DateSelect);
    this.reporte(this.DateSelect)
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

  reporte(fecha: string){
    this._medidorService.getMedidorDiaReporte(fecha+"n"+this.piso).subscribe(data => {
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
      }
    })
  }



  getMedidorDia(fecha: string){
    this._medidorService.getMedidorDia(fecha+"n"+this.piso).subscribe(data => {
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
            title: 'Voltaje Trifasico',
            yaxis: {
              range: [227.5, 230]
            }
          }
        };

        this.graphVtri = {
          data: [
              { x: this.fecha ,
                y: this.listMedidor.map((listMedidor: any) => listMedidor.vl1),
                type: 'line',
                name: "Linea 1" },
              { x: this.fecha ,
                y: this.listMedidor.map((listMedidor: any) => listMedidor.vl2),
                name: "Linea 2",
                type: 'line' },
                { x: this.fecha ,
                  y: this.listMedidor.map((listMedidor: any) => listMedidor.vl3),
                  name: "Linea 3",
                  type: 'line' },
          ],
          layout: {
            title: 'Voltaje Por Linea',
            yaxis: {
              range: [130, 135]
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
              range: [Math.max.apply(null, this.intencidad), Math.min.apply(null, this.intencidad)]
            }
          }
        };

        this.graphIntesidadTri = {
          data: [
            { x: this.fecha ,
              y: this.listMedidor.map((listMedidor: any) => listMedidor.il1),
              type: 'line',
              name: "Linea 1" },
            { x: this.fecha ,
              y: this.listMedidor.map((listMedidor: any) => listMedidor.il2),
              name: "Linea 2",
              type: 'line' },
              { x: this.fecha ,
                y: this.listMedidor.map((listMedidor: any) => listMedidor.il3),
                name: "Linea 3",
                type: 'line' },
            ],
          layout: {
            title: 'Intensidad Por linea',
            yaxis: {
              range: [Math.max.apply(null, this.intencidad), Math.min.apply(null, this.intencidad)]
            }
          }
        };

        this.graphPotencia = {
          data: [
              { x: this.fecha ,
                y: this.listMedidor.map((listMedidor: any) => listMedidor.ap3ph),
                type: 'line' },
          ],
          layout: {
            title: 'Potencia Activa Trifasica',
            yaxis: {
              range: [Math.max.apply(this.listMedidor.map((listMedidor: any) => listMedidor.ap3ph)),
                Math.min.apply(this.listMedidor.map((listMedidor: any) => listMedidor.ap3ph))]
            }
          }
        };

        this.graphPotenciaTri = {
          data: [
            { x: this.fecha ,
              y: this.listMedidor.map((listMedidor: any) => listMedidor.apl1),
              type: 'line',
              name: "Linea 1" },
            { x: this.fecha ,
              y: this.listMedidor.map((listMedidor: any) => listMedidor.apl2),
              name: "Linea 2",
              type: 'line' },
              { x: this.fecha ,
                y: this.listMedidor.map((listMedidor: any) => listMedidor.apl3),
                name: "Linea 3",
                type: 'line' },
            ],
          layout: {
            title: 'Potencia Activa Por Línea',
            yaxis: {
              range: [Math.max.apply(this.listMedidor.map((listMedidor: any) => listMedidor.apl1)),
                Math.min.apply(this.listMedidor.map((listMedidor: any) => listMedidor.apl2))]
            }
          }
        };

        this.graphFrec = {
          data: [
              { x: this.fecha ,
                y: this.listMedidor.map((listMedidor: any) => listMedidor.freq),
                type: 'line' },
          ],
          layout: {
            title: 'Frecuencia',

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
