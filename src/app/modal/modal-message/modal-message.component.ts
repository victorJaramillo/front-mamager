import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { UtilService } from 'src/app/services/util.service';
import { ModalComponent } from '../modal.component';
import { ModalInfoService } from 'src/app/services/modal-info.service';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.scss']
})
export class ModalMessageComponent implements OnInit {
  constructor(public modalRef: MdbModalRef<ModalComponent>,
    private util: UtilService,
    private modalInfoService: ModalInfoService,
    ) {}
    modalTitle:any
    modalBody:any

    ngOnInit(): void {
      this.modalInfoService.selectedProduct$.subscribe((value) => {
        this.modalTitle = value
      })

      this.modalInfoService.selectedBody$.subscribe((val) => {
        this.modalBody = val
      })
    }
}
