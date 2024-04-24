import { Component, ViewChild } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ModalEditValuesTemplateService } from 'src/app/services/modal-edit-values-template.service';

@Component({
  selector: 'app-modal-edit-values-template',
  templateUrl: './modal-edit-two-values.component.html',
  styleUrls: ['./modal-edit-two-values.component.scss']
})
export class ModalEditTwoValuesComponent {

  @ViewChild('title') inputTitle:any;
  @ViewChild('url') inputUrl:any;

  spinnerActive:boolean = false;
  confirmDelete:boolean = false;
  item:any = {};

  constructor(public modalRef: MdbModalRef<ModalEditTwoValuesComponent>, private modalTemplate: ModalEditValuesTemplateService){}

  delete(){}
  saveChanges(){}
  confirmDeleteButton(){}

  ngOnInit(){
    this.modalTemplate.getEditValuesTemplate$.subscribe((val) => {
      console.log(val);
      this.item.title = val.modalTitle
      this.item.url = val.modalSubtitle
      this.item.subtitle = val.modalSubtitle
    })
  }

}
