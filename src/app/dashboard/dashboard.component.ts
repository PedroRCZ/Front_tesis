import { Component, OnInit } from '@angular/core';
import { SimulacionServices } from '../servicios/simulacion.services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _simulacion: SimulacionServices,
  ) { }

  estadoSimu: string  = '0';

  ngOnInit(): void {
  }

  estado(){
    this._simulacion.EncenderApagarSimulacion(this.estadoSimu).subscribe(data => {
      if(Object.keys(data).length === 0){
        console.log("no datos");
      }else{
        console.log("encendido-Apagado")
      }
    })
  }

}
