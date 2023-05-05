import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalInfoService {

  private product$ = new BehaviorSubject<any>({});
  selectedProduct$ = this.product$.asObservable();

  setProduct(product: any) {
    this.product$.next(product);
  }
}
