import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  constructor(public modalRef: MdbModalRef<ModalComponent>,
    private util: UtilService,
    ) {}
  
    spinnerActive:boolean = false;

  saveChanges(name:string, link:string){
    this.spinnerActive = true
    setTimeout(() => {
      this.modalRef.close()
    }, 1500);
  }
}
