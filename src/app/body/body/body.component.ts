import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from 'src/app/modal/modal.component';
import { UtilService } from 'src/app/services/util.service';


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
  pages: any = [];
  clickedPage: any = 1;
  indicatorStatus: Boolean = false;
  statusText: string = 'Down'

  configured_animes: any = []
  anime_names: any = [];
  selected_anime_names: any = [];
  queryParams:any = {};

  endpoint: string = 'https://nodeapi.vjdev.xyz/api/v1/animeonline/scraping/configured';

  spinnerActiveIndicator: boolean = false;
  spinnerActiveAnime: boolean = false;
  constructor(
    private util: UtilService,
    private modalService: MdbModalService
  ) { }

  ngOnInit(): void {
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
    const headers: any = { 'apikey': 'JDJiJDEwJFhTNmo2b2hzdVBJNU1oN3JtbGY3emVIbUtBNWdFalM2RkV3TGc0aTlQUzhVM1ZtdE9raHph' }
    if (!params) {
      this.util.httpGetRequest(this.endpoint, headers).subscribe((x) => {
        this.configured_animes =x
        for (let index = 0; index < this.configured_animes.totalPages; index++) {        
          this.pages.push(index + 1)
        }
        this.spinnerActiveAnime = true
      })
    } else {
      this.util.httpGetRequest(`${this.endpoint}?${params}`, headers).subscribe((res) => {
        this.configured_animes = res;
      })
    }
  }

  get_anime_names() {
    const headers: any = { 'apikey': 'JDJiJDEwJFhTNmo2b2hzdVBJNU1oN3JtbGY3emVIbUtBNWdFalM2RkV3TGc0aTlQUzhVM1ZtdE9raHph' }
    let queryString = this.util.buildQueryString({itemsPerPage:100})
    this.util.httpGetRequest(`${this.endpoint}?${queryString}`, headers).subscribe((res: any) => {
      res.results.map((ele: any) => {
        if (!this.anime_names.includes(ele.title)) {
          this.anime_names.push(ele.title)
        }
      })
    })
  }

  public update(item: any) {
    const headers: any = { 'apikey': 'JDJiJDEwJFhTNmo2b2hzdVBJNU1oN3JtbGY3emVIbUtBNWdFalM2RkV3TGc0aTlQUzhVM1ZtdE9raHph' }
    this.queryParams['animeName']=item.target.value
    this.queryParams['currentPage'] = 1
    this.clickedPage = 1
    var queryString = this.util.buildQueryString(this.queryParams)
    this.pages = []
    
    this.util.httpGetRequest(`${this.endpoint}?${queryString}`, headers).subscribe((res) => {
      this.configured_animes = res;
      for (let index = 0; index < this.configured_animes.totalPages; index++) {
        this.pages.push(index + 1)
      }
    })
  }

  public openModal(){
    this.modalRef = this.modalService.open(ModalComponent)
  }
}
