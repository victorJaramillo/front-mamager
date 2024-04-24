import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalEditValuesTemplateService {

  private editValuesTemplate$ = new BehaviorSubject<any>({});
  getEditValuesTemplate$ = this.editValuesTemplate$.asObservable();

  constructor() { }

  setValuesTemplate(values: any) {
    this.editValuesTemplate$.next(values);
  }
}
