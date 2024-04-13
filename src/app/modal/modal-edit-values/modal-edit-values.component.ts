import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ModalEditAnimeService } from 'src/app/services/modal-edit-anime.service';

@Component({
  selector: 'app-modal-edit-values',
  templateUrl: './modal-edit-values.component.html',
  styleUrls: ['./modal-edit-values.component.scss']
})
export class ModalEditValuesComponent {

  showOption = false;
  spinnerActiveIndicator: boolean = false;
  public item:any;
  spinnerActive:boolean = false;
  confirmDelete:boolean = false;

  constructor(public modalRef: MdbModalRef<ModalEditValuesComponent>,
    private modalEditService: ModalEditAnimeService){
      
    }
    
    ngOnInit(): void {
      this.modalEditService.selectItem$.subscribe((value) => {
        this.item = value
      })      
  }

  toggleOption(): void {
    this.showOption = !this.showOption;
    
    setTimeout(() => {
      this.showOption = !this.showOption;
    }, 3000);
  }

  saveChanges(){
    this.spinnerActive = true
  }
  
  confirmDeleteButton(){
    this.confirmDelete = true
    console.log(this.item);
  }
  
  delete(){
    this.spinnerActive = true
  }

}
