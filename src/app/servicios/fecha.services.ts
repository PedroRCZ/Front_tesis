import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FechaServices{
  url = "http://localhost:4000/fecha/"

  constructor(private http: HttpClient){ }

  getFechas(id: string): Observable <any>{
    return this.http.get(this.url + "dia/max_min/" + id);
  }
  getFechasMes(id: string): Observable <any>{
    return this.http.get(this.url + "mes/max_min/" + id);
  }
  getFechasAnio(id: string): Observable <any>{
    return this.http.get(this.url + "anio/" + id);
  }



}
