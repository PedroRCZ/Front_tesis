import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Medidores } from 'src/app/models/medidores.model';
import { SimulacionServices } from 'src/app/servicios/simulacion.services';
import {FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-simulacion-form',
  templateUrl: './simulacion-form.component.html',
  styleUrls: ['./simulacion-form.component.css']
})
export class SimulacionFormComponent implements OnInit {


  editarFrom = new FormGroup({
    v3ph : new FormControl(''), vl1 : new FormControl(''), vl2 : new FormControl(''),
    vl3 : new FormControl(''), i3ph : new FormControl(''), il1 : new FormControl(''),
     il2 : new FormControl(''), il3 : new FormControl(''), pf3ph : new FormControl(''),
     pfl1 : new FormControl(''), pfl2 : new FormControl(''), pfl3 : new FormControl(''),
      ap3ph : new FormControl(''), apl1 : new FormControl(''), apl2 : new FormControl(''),
       apl3 : new FormControl(''), rp3ph: new FormControl(''), rpl1: new FormControl(''),
       rpl2: new FormControl(''), rpl3: new FormControl(''), freq: new FormControl(''),
        ae3ph: new FormControl(''), ael1: new FormControl(''), ael2: new FormControl(''),
         ael3: new FormControl(''), re3ph: new FormControl(''), rel1: new FormControl(''),
         rel2: new FormControl(''), rel3: new FormControl(''), piso : new FormControl(''),
         id : new FormControl('')});
  constructor( private _simulacionServices: SimulacionServices,
              private router: Router,private activerouter: ActivatedRoute) { }

  btn = false;

  ngOnInit(): void {
    let medidoresId = this.activerouter.snapshot.paramMap.get('id')
    if(medidoresId == null){
      console.log("no datos")
    }
    else{
      console.log("datos")
      this.btn = true;
      this.editarDatos()
    }
  }

  editarDatos(){
    this.editarFrom.setValue({
      'v3ph' : Number(this.activerouter.snapshot.paramMap.get('v3ph')),
      'vl1' : Number(this.activerouter.snapshot.paramMap.get('vl1')),
      'vl2' : Number(this.activerouter.snapshot.paramMap.get('vl2')),
      'vl3' : Number(this.activerouter.snapshot.paramMap.get('vl3')),
      'i3ph' : Number(this.activerouter.snapshot.paramMap.get('i3ph')),
      'il1' : Number(this.activerouter.snapshot.paramMap.get('il1')),
      'il2' : Number(this.activerouter.snapshot.paramMap.get('il2')),
      'il3' : Number(this.activerouter.snapshot.paramMap.get('il3')),
      'pf3ph' : Number(this.activerouter.snapshot.paramMap.get('pf3ph')),
      'pfl1' : Number(this.activerouter.snapshot.paramMap.get('pfl1')),
      'pfl2' : Number(this.activerouter.snapshot.paramMap.get('pfl2')),
      'pfl3' : Number(this.activerouter.snapshot.paramMap.get('pfl3')),
      'ap3ph' : Number(this.activerouter.snapshot.paramMap.get('ap3ph')),
      'apl1' : Number(this.activerouter.snapshot.paramMap.get('apl1')),
      'apl2' : Number(this.activerouter.snapshot.paramMap.get('apl2')),
      'apl3' : Number(this.activerouter.snapshot.paramMap.get('apl3')),
      'rp3ph' : Number(this.activerouter.snapshot.paramMap.get('rp3ph')),
      'rpl1' : Number(this.activerouter.snapshot.paramMap.get('rpl1')),
      'rpl2' : Number(this.activerouter.snapshot.paramMap.get('rpl2')),
      'rpl3' : Number(this.activerouter.snapshot.paramMap.get('rpl3')),
      'freq' : Number(this.activerouter.snapshot.paramMap.get('freq')),
      'ae3ph' : Number(this.activerouter.snapshot.paramMap.get('ae3ph')),
      'ael1' : Number(this.activerouter.snapshot.paramMap.get('ael1')),
      'ael2' : Number(this.activerouter.snapshot.paramMap.get('ael2')),
      'ael3' : Number(this.activerouter.snapshot.paramMap.get('ael3')),
      're3ph' : Number(this.activerouter.snapshot.paramMap.get('re3ph')),
      'rel1' : Number(this.activerouter.snapshot.paramMap.get('rel1')),
      'rel2' : Number(this.activerouter.snapshot.paramMap.get('rel2')),
      'rel3' : Number(this.activerouter.snapshot.paramMap.get('rel3')),
      'piso' : Number(this.activerouter.snapshot.paramMap.get('piso')),
      'id' : Number(this.activerouter.snapshot.paramMap.get('id'))
    })
    console.log(this.editarFrom)

  }

  onGuardar(form: Medidores){
    this._simulacionServices.agregarMedidor(form).subscribe(data =>{
      console.log("guardado")
      this.router.navigate(['medidores/simulacion'])
    },error =>{
      console.log(error);
    })
    console.log(form)
  }

  onEditar(form: Medidores){
    console.log("editado")
    console.log(form.id)
    this._simulacionServices.editMedidor(form.id, form).subscribe(data =>{
    },error =>{
      console.log(error);
    })
    console.log(form)
    this.router.navigate(['medidores/simulacion'])
  }

  eliminar(){
    console.log("eliminado")
    let id = this.activerouter.snapshot.paramMap.get('id')
    let piso = this.activerouter.snapshot.paramMap.get('piso')
    this._simulacionServices.delectMedidor(id + "n" + piso).subscribe(data=>{
    },error =>{
      console.log(error);
    })
    this.router.navigate(['medidores/simulacion'])
  }
}
