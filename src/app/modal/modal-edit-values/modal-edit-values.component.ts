import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { CatchResponseService } from 'src/app/services/catch-response.service';
import { ModalEditAnimeService } from 'src/app/services/modal-edit-anime.service';
import { UtilService } from 'src/app/services/util.service';
import { environment as env } from 'src/environment/environment';

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

  headers: any = { 'apikey': env.API_KEY }

  endpointDeleteAnime: string = 'https://nodeapi.vjdev.xyz/api/v1/animeonline/delete/'

  constructor(public modalRef: MdbModalRef<ModalEditValuesComponent>,
    private modalEditService: ModalEditAnimeService,
    private responseService: CatchResponseService,
    private util: UtilService){
      
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
  }
  
  delete(){
    this.spinnerActive = true
    this.util.httpDeleteRequest(`${this.endpointDeleteAnime}${this.item.id}`, this.headers).subscribe( (res: any) => {
      if(res.status === 'ok'){
        res.current_page = this.item.current_page
        this.responseService.setResponse(res)
        this.modalRef.close()
      }
    })
  }

}
