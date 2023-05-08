import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal-apikey-values',
  templateUrl: './modal-apikey-values.component.html',
  styleUrls: ['./modal-apikey-values.component.scss']
})
export class ModalApikeyValuesComponent {
  constructor(public modalRef: MdbModalRef<ModalApikeyValuesComponent>){}
}
