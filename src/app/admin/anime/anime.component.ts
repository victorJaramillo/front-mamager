import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from 'src/app/modal/modal.component';
import { UtilService } from 'src/app/services/util.service';
import { environment as env } from 'src/environment/environment';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.scss']
})
export class AnimeComponent implements OnInit  {
  modalRef: MdbModalRef<ModalComponent> | null = null;

  spinnerActive: Boolean = false
  spinnerActiveIndicator: boolean = false;
  indicatorStatus: Boolean = false;
  statusText: string = 'Down'

  configuredAnime: any ;
  pages: any;
  clickedPage: any;

  headers: any = { 'apikey': env.API_KEY }

  endpointFindNewChapters: string = 'https://nodeapi.vjdev.xyz/api/v1/animeonline/scraping'

  constructor(
    private util: UtilService,
    private modalService: MdbModalService,
  ){}


  ngOnInit(): void {
    this.pages = [];
    this.clickedPage = 1;

    this.getConfiguredAnimes()
  }

  getConfiguredAnimes() {
    this.util.httpGetRequest('https://nodeapi.vjdev.xyz/api/v1/animeonline/configured', this.headers).subscribe( (res) => {
      this.configuredAnime = res
      for (let index = 0; index < this.configuredAnime.totalPages; index++) {
        this.pages.push(index + 1)
      }
      this.spinnerActiveIndicator = true
    })

  }

  public changeCurrentPage(value: any) {

  }

  public activateDesactivate(event?: any, item?:any){
    console.log(item);
    console.log(event.target.checked);
    
  }

  public openModal() {
    this.modalRef = this.modalService.open(ModalComponent)
  }

  public refreshAnimes() {
    this.spinnerActive = true
    this.spinnerActiveIndicator = false;
    this.util.httpGetRequest(this.endpointFindNewChapters, this.headers).subscribe((res) => {
      this.ngOnInit()
      this.spinnerActive = false
      this.spinnerActiveIndicator = false
    })
  }
}
