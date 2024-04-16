import { Component, ViewChild } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CatchResponseService } from 'src/app/services/catch-response.service';
import { ModalEditAnimeService } from 'src/app/services/modal-edit-anime.service';
import { UtilService } from 'src/app/services/util.service';
import { environment as env } from 'src/environment/environment';
import { ModalMessageComponent } from '../modal-message/modal-message.component';
import { ModalInfoService } from 'src/app/services/modal-info.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-modal-edit-values',
  templateUrl: './modal-edit-values.component.html',
  styleUrls: ['./modal-edit-values.component.scss']
})
export class ModalEditValuesComponent {

  @ViewChild('title') inputTitle:any;
  @ViewChild('url') inputUrl:any;

  showOption = false;
  spinnerActiveIndicator: boolean = false;
  public item:any;
  spinnerActive:boolean = false;
  confirmDelete:boolean = false;

  headers: any = { 'apikey': env.API_KEY }

  endpointDeleteAnime: string = 'https://nodeapi.vjdev.xyz/api/v1/animeonline/delete/'
  endpointModifyAnime: string = 'https://nodeapi.vjdev.xyz/api/v1/animeonline/scraping/modify/scraping/'

  modalMessRef: MdbModalRef<ModalMessageComponent> | null = null;

  constructor(public modalRef: MdbModalRef<ModalEditValuesComponent>,
    
    private modalEditService: ModalEditAnimeService,
    private responseService: CatchResponseService,
    private modalService: MdbModalService,
    private modalInfoService: ModalInfoService,
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
    console.log(this.item);
    
    this.spinnerActive = true
    const body = {title: this.inputTitle.nativeElement.value, url: this.inputUrl.nativeElement.value}
    this.util.httpPutRequest(`${this.endpointModifyAnime}${this.item.id}`, body, this.headers)
    .pipe(
      catchError(err => {
        const statusCode = err.status
        this.modalInfoService.setTitel(`Error`)
        this.modalRef.close()
        this.modalInfoService.setBody(`${err.error.error.code}\n${err}`)
        this.modalMessRef = this.modalService.open(ModalMessageComponent)
        return err
      })
    ).subscribe(resp => {
      this.callback(resp);
      return resp
    })
    }
    
  private callback(res: any) {
    res.status = 'ok'
    res.current_page = this.item.current_page;
    this.responseService.setResponse(res);
    this.modalRef.close();
  }

  confirmDeleteButton(){
    this.confirmDelete = true
  }
  
  delete(){
    this.spinnerActive = true
    this.util.httpDeleteRequest(`${this.endpointDeleteAnime}${this.item.id}`, this.headers).subscribe( (res: any) => {
      
      if(res.status === 'ok'){
        this.callback(res);
      }
    }, err => {
      this.modalInfoService.setTitel(`Error`)
      this.modalRef.close()
      this.modalInfoService.setBody(`${err.error.error.code}\n${err.error.error.sqlMessage}`)
      this.modalMessRef = this.modalService.open(ModalMessageComponent)
    })
  }

}
