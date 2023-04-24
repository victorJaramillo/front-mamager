import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from 'src/app/modal/modal.component';
import { UtilService } from 'src/app/services/util.service';
import { environment as env } from 'src/environment/environment';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  modalRef: MdbModalRef<ModalComponent> | null = null;

  elements: any = {}
  dolar: any = {};
  uf: any = {};
  pages: any;
  clickedPage: any;
  indicatorStatus: Boolean = false;
  statusText: string = 'Down'

  configured_animes: any = []
  anime_names: any = [];
  selected_anime_names: any = [];
  queryParams:any = {};
  spinnerActive: Boolean = false

  endpoint: string = 'https://nodeapi.vjdev.xyz/api/v1/animeonline/scraping/configured';
  endpointFindNewChapters: string = 'https://nodeapi.vjdev.xyz/api/v1/animeonline/scraping'

  spinnerActiveIndicator: boolean = false;
  spinnerActiveAnime: boolean = false;

  headers: any = { 'apikey': env.API_KEY }

  constructor(
    private util: UtilService,
    private modalService: MdbModalService,
  ) { }

  ngOnInit(): void {
    this.clickedPage= 1;
    this.pages = []
    this.get_indicators()
    this.get_configured_anime_scraping()
    this.get_anime_names()
  }

  private get_indicators() {
    this.util.httpGetRequest('https://nodeapi.vjdev.xyz/api/v2/currconv/available/cl').subscribe((res) => {
      this.elements = res;
      this.dolar = this.elements.dollar;
      this.uf = this.elements.uf;
      this.indicatorStatus = true
      this.statusText = 'Up'
      this.spinnerActiveIndicator = true
    })
  }

  public get_configured_anime_scraping() {
    this.get_configured_anime(null)
  }

  public changeCurrentPage(value: any) {
    this.clickedPage = value;
    this.queryParams['currentPage'] = value
    var queryString = this.util.buildQueryString(this.queryParams)
    this.get_configured_anime(queryString)
  }

  private get_configured_anime(params: any) {
    if (!params) {
      this.spinnerActiveAnime = false
      this.util.httpGetRequest(this.endpoint, this.headers).subscribe((x) => {
        this.configured_animes =x
        for (let index = 0; index < this.configured_animes.totalPages; index++) {        
          this.pages.push(index + 1)
        }
        this.spinnerActiveAnime = true
      })
    } else {
      this.spinnerActiveAnime = false
      this.util.httpGetRequest(`${this.endpoint}?${params}`, this.headers).subscribe((res) => {
        this.configured_animes = res;
        this.spinnerActiveAnime = true
      })
    }
  }

  get_anime_names() {
    let queryString = this.util.buildQueryString({itemsPerPage:100})
    this.util.httpGetRequest(`${this.endpoint}?${queryString}`, this.headers).subscribe((res: any) => {
      res.results.map((ele: any) => {
        if (!this.anime_names.includes(ele.title)) {
          this.anime_names.push(ele.title)
        }
      })
    })
  }

  public update(item: any) {
    this.spinnerActiveAnime = false
    this.queryParams['animeName']=item.target.value
    this.filteredUpdate();
  }
  
  private filteredUpdate() {
    this.queryParams['currentPage'] = 1
    this.clickedPage = 1
    var queryString = this.util.buildQueryString(this.queryParams);
    this.pages = [];

    this.util.httpGetRequest(`${this.endpoint}?${queryString}`, this.headers).subscribe((res) => {
      this.configured_animes = res;
      for (let index = 0; index < this.configured_animes.totalPages; index++) {
        this.pages.push(index + 1);
      }
      this.spinnerActiveAnime = true;
    });
  }

  public openModal(){
    this.modalRef = this.modalService.open(ModalComponent)
  }

  public refreshAnimes() {
    this.spinnerActive  = true
    this.util.httpGetRequest(this.endpointFindNewChapters, this.headers).subscribe((res) => {
      this.ngOnInit()
      this.spinnerActive  = false
    })
  }

  public clickedLink(link: any) {
    var endpoint = this.endpointFindNewChapters  
    endpoint += `/clicked-anime`
    const body = {url: link}
    this.util.httpPutRequest(endpoint, body, this.headers).subscribe((res) => {
      this.filteredUpdate()
    })
  }

  public clickedFilter(option?: any){
    this.queryParams['clicked'] = (option === undefined ? '' : option)
    this.filteredUpdate()
  }

}
