import { Component, OnInit } from '@angular/core';
import { SimulacionServices } from '../servicios/simulacion.services';
import {FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms'
import {User} from 'src/app/models/user.model';
import { LoginServices } from 'src/app/servicios/login.services'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isExpanded: boolean = false;

  editarFrom = new FormGroup({
    username : new FormControl(''), password : new FormControl('')
  })

  constructor(
    private _simulacion: SimulacionServices,
    private _login : LoginServices,
  ) { }

  estadoSimu: string  = '2';

  ngOnInit(): void {
  }
  btn = false
  estado(){
    this._simulacion.EncenderApagarSimulacion(this.estadoSimu).subscribe(data => {
      if(Object.keys(data).length === 0){
        console.log("no datos");
      }else{
        console.log("encendido-Apagado")
      }
    })
  }

  login(form: User){
    this._login.getUser(form.username+"-"+form.password).subscribe(data =>{
      console.log(data)
      if(Object.keys(data).length === 0){
        console.log("no datos");
      }else{
        console.log("encendido-Apagado")
        this.btn = true;
      }
    },error =>{
      console.log(error);
    })
    console.log(form)
  }

  salir(){
    this.btn = false;
  }

}
