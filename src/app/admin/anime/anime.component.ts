import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { environment as env } from 'src/environment/environment';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.scss']
})
export class AnimeComponent implements OnInit  {
  spinnerActiveIndicator: boolean = false;
  indicatorStatus: Boolean = false;
  statusText: string = 'Down'

  configuredAnime: any ;
  pages: any;
  clickedPage: any;

  headers: any = { 'apikey': env.API_KEY }

  constructor(
    private util: UtilService
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
    console.log(event);
    
  }
}
