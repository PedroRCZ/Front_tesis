import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class LoginServices{
  url = "http://localhost:4000/login/"

  constructor(private http: HttpClient){ }

  getUser(id: String): Observable <any>{
    return this.http.get(this.url + id);
  }

}
