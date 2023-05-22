import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { UtilService } from 'src/app/services/util.service';
import { ModalInfoService } from 'src/app/services/modal-info.service';

@Component({
  selector: 'app-modal-apikey-details',
  templateUrl: './modal-apikey-details.component.html',
  styleUrls: ['./modal-apikey-details.component.scss']
})
export class ModalApikeyDetailsComponent {

  showOption = false;

  constructor(public modalRef: MdbModalRef<ModalApikeyDetailsComponent>,
    private util: UtilService,
    private modalInfoService: ModalInfoService,
  ) { }

  toggleOption(): void {
    this.showOption = !this.showOption;
    
    setTimeout(() => {
      this.showOption = !this.showOption;
    }, 3000);
  }

}
