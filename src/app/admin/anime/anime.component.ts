import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('name') inputName:any;

  modalRef: MdbModalRef<ModalComponent> | null = null;

  spinnerActive: Boolean = false
  spinnerActiveIndicator: boolean = false;
  indicatorStatus: Boolean = false;
  statusText: string = 'Down'
  activeFilterName:boolean = false


  configuredAnime: any ;
  pages: any;
  clickedPage: any = 1;

  headers: any = { 'apikey': env.API_KEY }
  configured_anime_url: any = env.CONFIGURED_ANIME_URL
  queryParams: any = {};

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

  // < ---- HTTP ----- >

  getConfiguredAnimes(params?:any) {
    if(!params){
      this.util.httpGetRequest(this.configured_anime_url, this.headers).subscribe( (res) => {
        this.configuredAnime = res
        for (let index = 0; index < this.configuredAnime.totalPages; index++) {
          this.pages.push(index + 1)
        }
        this.spinnerActiveIndicator = true
      })
    }else {
      this.util.httpGetRequest(`${this.configured_anime_url}?${params}`, this.headers).subscribe( (res) => {
        this.configuredAnime = res
        this.spinnerActiveIndicator = true
      })
    }
    
  }
  
  public activateDesactivate(event?: any, item?:any){   
    const body:any = {enable: event.target.checked}
    this.util.httpPutRequest(this.configured_anime_url+'/'+item.id, body, this.headers).subscribe( (res?:any) => {
      alert(res.message)
    })
  }

  // < ---- HTTP ----- >




  // < --- FILTERS --- > 

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

  public changeCurrentPage(value: any) {
    this.spinnerActiveIndicator = false
    this.clickedPage = value;
    this.queryParams.currentPage = value
    var queryString = this.util.buildQueryString(this.queryParams)
    this.getConfiguredAnimes(queryString)
  }

  public filterByName() {    
    this.activeFilterName = true
  }
  
  public clearButton() {
    this.activeFilterName = false
    this.inputName.nativeElement.value = ""
  }
  
  // < --- FILTERS --- > 
}
