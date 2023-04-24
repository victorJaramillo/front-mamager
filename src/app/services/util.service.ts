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
  
  httpPostRequest(url:string, body:any, headers?:any) {
    return this.http.post(url, body, this.getHttpOptions(headers))
  }
  
  httpPutRequest(url:string, body:any, headers?:any) {
    return this.http.put(url, body, this.getHttpOptions(headers))
  }

  buildQueryString(queryParams:any) {
    return Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&');
  }
}
