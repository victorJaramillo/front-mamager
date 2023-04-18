import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  getHttpOptions(headers:any) {
    return {
      headers: new HttpHeaders(headers)
    };
  }  
}
