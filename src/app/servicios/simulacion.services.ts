import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medidores } from '../models/medidores.model';

@Injectable({
  providedIn: 'root'
})

export class SimulacionServices{
  url = "http://localhost:4000/medidor/"

  constructor(private http: HttpClient){ }

  EncenderApagarSimulacion(id: string): Observable <any>{
    return this.http.get(this.url + "simular/" + id);
  }

  DatosSimulacion(id: string): Observable <any>{
    return this.http.get(this.url + "simular/datos/" + id);
  }

  agregarMedidor( medidor: Medidores): Observable <any>{
    return this.http.get(this.url + "/agregar" + medidor)
  }

  editMedidor(id: number, medidor: Medidores): Observable <any>{
    return this.http.put(this.url + id , medidor);
  }

}
