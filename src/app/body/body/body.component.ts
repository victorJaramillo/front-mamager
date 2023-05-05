
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
  queryParams: any = {};
  spinnerActive: Boolean = false

  endpoint: string = 'https://nodeapi.vjdev.xyz/api/v1/animeonline/scraping/configured';
  endpointFindNewChapters: string = 'https://nodeapi.vjdev.xyz/api/v1/animeonline/scraping'

  spinnerActiveIndicator: boolean = false;
  spinnerActiveAnime: boolean = false;

  headers: any = { 'apikey': env.API_KEY }

  radioButtons = [{ name: 'All', value: '' }, { name: 'Clicked', value: 1 }, { name: 'Unclicked', value: 0 }]
  radioActive: any;
  enaSeason: boolean = false;
  seasons: any = []
  seasons2: any = []
  selectedSeason: any;

  constructor(
    private util: UtilService,
    private modalService: MdbModalService,
  ) { }

  ngOnInit(): void {
    this.seasons = []
    this.enaSeason = false;
    this.radioActive = '';
    this.clickedPage = 1;
    this.pages = []
    this.queryParams = {}
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
        this.configured_animes = x
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
    let queryString = this.util.buildQueryString({ itemsPerPage: 1000 })
    this.util.httpGetRequest(`${this.endpoint}?${queryString}`, this.headers).subscribe((res: any) => {
      res.results.map((ele: any) => {
        if (!this.anime_names.includes(ele.title)) {
          this.anime_names.push(ele.title)
        }

        if(!this.seasons.includes(ele.title)){
          const as = {"title": ele.title, "season": ele.season}
          this.seasons.push(as)
        }
      })
    })
    
  }

  public update(item: any) {
    item.target.value ? this.enaSeason = true : this.enaSeason = false
    this.seasons2 = []
    this.selectedSeason = ''
    this.queryParams['animeName'] = item.target.value
    delete this.queryParams.season
    this.seasons.map((ele:any) => {    
      if(ele.title == item.target.value){
        
        if(!this.seasons2.includes(ele.season))
        this.seasons2.push(ele.season)
      }
    })
    this.filteredUpdate(true);
  }
  public updateSeason(item: any) {
    const season = item.target.value
    
    season ? this.queryParams['season'] = season : delete this.queryParams['season']

    this.resetClickedAndCurrentPage();
    
    var queryString = this.util.buildQueryString(this.queryParams);
    this.getElementsByQueryString(queryString)
  }

  private filteredUpdate(updatePage: boolean) {
    if (updatePage) {
      this.resetClickedAndCurrentPage();
    }
    var queryString = this.util.buildQueryString(this.queryParams);
    
    this.getElementsByQueryString(queryString);
  }
  
  private resetClickedAndCurrentPage() {
    this.queryParams['currentPage'] = 1;
    this.clickedPage = 1;
  }

  private getElementsByQueryString(queryString: string) {
    this.spinnerActiveAnime = false;
    this.pages = [];
    this.util.httpGetRequest(`${this.endpoint}?${queryString}`, this.headers).subscribe((res) => {
      this.configured_animes = res;
      for (let index = 0; index < this.configured_animes.totalPages; index++) {
        this.pages.push(index + 1);
      }
      this.spinnerActiveAnime = true;
    });
  }

  public openModal() {
    this.modalRef = this.modalService.open(ModalComponent)
  }

  public refreshAnimes() {
    this.spinnerActive = true
    this.spinnerActiveAnime = false;
    this.util.httpGetRequest(this.endpointFindNewChapters, this.headers).subscribe((res) => {
      this.ngOnInit()
      this.spinnerActive = false
      this.spinnerActiveAnime = false
    })
  }

  public clickedLink(link: any) {
    if (!Boolean(link.clicked)) {
      var endpoint = this.endpointFindNewChapters
      endpoint += `/clicked-anime`
      const body = { url: link.chapter_link }
      this.util.httpPutRequest(endpoint, body, this.headers).subscribe((res) => {
        this.filteredUpdate(false)
      })
    }
  }

  public clickedFilter(checkedOption?: any) {
    this.radioActive = checkedOption
    this.queryParams['clicked'] = (checkedOption === undefined ? '' : checkedOption)
    this.filteredUpdate(true)
  }

}
