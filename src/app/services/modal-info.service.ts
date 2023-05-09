import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalInfoService {

  private product$ = new BehaviorSubject<any>({});
  selectedProduct$ = this.product$.asObservable();
  private body$ = new BehaviorSubject<any>({});
  selectedBody$ = this.body$.asObservable();

  setProduct(product: any) {
    this.product$.next(product);
  }
  
  setTitel(title: any){
    this.product$.next(title);
  }
  setBody(body: any){
    this.body$.next(body);
  }
}
