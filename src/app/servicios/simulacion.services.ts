import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SimulacionServices{
  url = "http://localhost:4000/medidor/"

  constructor(private http: HttpClient){ }

  EncenderApagarSimulacion(id: string): Observable <any>{
    return this.http.get(this.url + "simular/" + id);
  }

}
