import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal-edit-values',
  templateUrl: './modal-edit-values.component.html',
  styleUrls: ['./modal-edit-values.component.scss']
})
export class ModalEditValuesComponent {

  showOption = false;
  spinnerActiveIndicator: boolean = false;
  @Input() public item:any;

  constructor(public modalRef: MdbModalRef<ModalEditValuesComponent>){
    console.log(this.item);
    
  }

  toggleOption(): void {
    this.showOption = !this.showOption;
    
    setTimeout(() => {
      this.showOption = !this.showOption;
    }, 3000);
  }

}
