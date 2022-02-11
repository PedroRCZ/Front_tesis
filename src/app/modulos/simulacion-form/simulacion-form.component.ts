import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medidores } from 'src/app/models/medidores.model';
import { SimulacionServices } from 'src/app/servicios/simulacion.services';

@Component({
  selector: 'app-simulacion-form',
  templateUrl: './simulacion-form.component.html',
  styleUrls: ['./simulacion-form.component.css']
})
export class SimulacionFormComponent implements OnInit {

  v3ph : number;
  vl1 : number;
  vl2 : number;
  vl3 : number;
  i3ph : number;
  il1 : number;
  il2 : number;
  il3 : number;
  pf3ph : number;
  pfl1 : number;
  pfl2 : number;
  pfl3 : number;
  ae3ph : number;
  re3ph : number;
  se3ph : number;
  piso : number;
  id : number;


  constructor( private _simulacionServices: SimulacionServices,
              private router: Router) { }

  ngOnInit(): void {
  }

  onGuardar(){
    let medidorSimu = new Medidores(this.v3ph,  this.vl1, this.vl2,
      this.vl3, this.i3ph,  this.il1, this.il2,
      this.il3, this.pf3ph,   this.pfl1,  this.pfl2,
       this.pfl3,  this.ae3ph,   this.re3ph,
       this.se3ph,   this.piso,  this.id)
      //this._simulacionServices.agregarMedidor(medidorSimu);
      this.router.navigate(['medidores/simulacion'])
  }
}
