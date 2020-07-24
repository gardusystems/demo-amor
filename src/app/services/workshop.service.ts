import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  constructor(private http: HttpClient) { }

  API_URL ="http://localhost:8080/api/workshops/";

  getWotkshops(page, limit){
    let formData = new FormData()

    formData.append('page', page.toString());
    formData.append('limit', limit.toString());

    
    return this.http.post(`${this.API_URL}list`, formData, {headers: new HttpHeaders()});
  }
}
