import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) { }

  getHttpOptions(headers:any) {
    return {
      headers: new HttpHeaders(headers)
    };
  }
  
  httpGetRequest(url:string, headers?:any) {
    return this.http.get(url, this.getHttpOptions(headers))
  }

  buildQueryString(queryParams:any) {
    return Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&');
  }
}
