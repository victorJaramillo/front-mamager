import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatchResponseService {

  private $response = new BehaviorSubject<any>({});
  selectResponse$ = this.$response.asObservable();

  constructor() { }

  setResponse(response: any) {
    this.$response.next(response)
  }
}
