import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MedidorServices{
  url = "http://localhost:4000/medidor/"

  constructor(private http: HttpClient){ }

  getMedidorDiakw(id: string): Observable <any>{
    return this.http.get(this.url + "diakw/" + id);
  }

  getMedidorDiaOcupacion(id: string): Observable <any>{
    return this.http.get(this.url + "diakwocupacion/" + id);
  }

  getMedidorDiaSuperficie(id: string): Observable <any>{
    return this.http.get(this.url + "diakwosuperf/" + id);
  }

  getMedidorDia(id: string): Observable <any>{
    return this.http.get(this.url + "dia/" + id);
  }

  getMedidorMes(id: string): Observable <any>{
    return this.http.get(this.url + "mes/" + id);
  }

  getMedidorAnio(id: string): Observable <any>{
    return this.http.get(this.url + "anio/" + id);
  }

}