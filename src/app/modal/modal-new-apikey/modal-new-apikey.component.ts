import { Component } from '@angular/core';
import { ModalComponent } from '../modal.component';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { UtilService } from 'src/app/services/util.service';
import { ModalInfoService } from 'src/app/services/modal-info.service';

@Component({
  selector: 'app-modal-new-apikey',
  templateUrl: './modal-new-apikey.component.html',
  styleUrls: ['./modal-new-apikey.component.scss']
})
export class ModalNewApikeyComponent {
  constructor(public modalRef: MdbModalRef<ModalComponent>,
    private util: UtilService,
    private modalInfoService: ModalInfoService,
  ) { }
}
