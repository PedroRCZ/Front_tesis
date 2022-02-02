import { Component, OnInit } from '@angular/core';
import { SimulacionServices } from '../../servicios/simulacion.services';
import { Medidores } from '../../models/medidores.model'

@Component({
  selector: 'app-simulacion-list',
  templateUrl: './simulacion-list.component.html',
  styleUrls: ['./simulacion-list.component.css']
})
export class SimulacionListComponent implements OnInit {

  constructor(
    private _simulacion: SimulacionServices,
  ) { }

  medidorSelec: string = "1";
  listMedidor: Medidores[] = [];

  ngOnInit(): void {

  }


  medidor(){
    this._simulacion.DatosSimulacion(this.medidorSelec).subscribe(data => {
      if(Object.keys(data).length === 0){
        console.log("no datos");
      }else{
        this.listMedidor = data;
        console.log(this.listMedidor)
      }
    })
  }

}
