import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalEditAnimeService {

  private $item = new BehaviorSubject<any>({});
  selectItem$ = this.$item.asObservable();

  constructor() { }

  setItem(item: any) {
    this.$item.next(item);
  }
}
