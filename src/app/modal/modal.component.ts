import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { UtilService } from 'src/app/services/util.service';
import { environment as env } from 'src/environment/environment';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  constructor(public modalRef: MdbModalRef<ModalComponent>,
    private util: UtilService,
    ) {}
    apikeyHeader: any = { 'apikey': env.API_KEY }
    spinnerActive:boolean = false;
    errorMessage:any = null
    newAnimeEndpoint: string = 'https://nodeapi.vjdev.xyz/api/v1/animeonline/scraping/new_scraping';

  saveChanges(name:string, link:string){
    this.spinnerActive = true
    let body= {title: name, url: link}
    this.util.httpPostRequest(this.newAnimeEndpoint, body,this.apikeyHeader).subscribe((ele:any) => {
      console.log('ELE => ',ele);
      if(ele.status === 400){
        this.errorMessage = ele.error.message
      }
      setTimeout(() => {
        this.modalRef.close()
      }, 1500);
    },
    err => {
      if(err.status === 400){
        this.spinnerActive = false
        this.errorMessage = String(err.error.message).toUpperCase()
      }
      setTimeout(() => {
        this.errorMessage = null
      }, 3500);
    })
  }
}
