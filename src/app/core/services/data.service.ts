import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  httpHeaders = new HttpHeaders();

  constructor(private httpClient: HttpClient) {
    this.httpHeaders.append('Accept', 'Application/json')
  }

  getDate(): Observable<any> {
    return this.httpClient.get('./assets/mock-data/data.json', {
       observe: 'response', headers: this.httpHeaders
    })
  }
}
