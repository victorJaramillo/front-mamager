import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TableInfoService } from 'src/app/services/table-info.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent {

  url: string = 'https://nodeapi.vjdev.xyz/api/v2/currconv/admin/currencies/values'

  table: any = {
    table_title: "Currencies",
    table_subtitle: "Scraping Currencies",
    table_headers: ["Value","Date","Action"],
    table_pages: 4,
  }

  current_page:any = 1;

  constructor(private tableInfoService: TableInfoService, private util: UtilService){}

  
  ngOnInit(): void {
    this.loadCurrencyValues()    
    this.tableInfoService.getCurrentPage$.
    subscribe((val) => this.changeCurrentPage(val))    
  }

  changeCurrentPage(page: string){
    this.loadCurrencyValues(page)
  }

  loadCurrencyValues(page?:string) {
    var newurl = this.url
    if(page) {
      newurl = `${this.url}?currentPage=${page}`
    }
    this.util.httpGetRequest(newurl, this.util.headers).subscribe( (res:any) => {
      this.table.table_data = res.results
      this.table.table_pages = res.totalPages
      this.table.table_data_keys= Object.keys(this.table.table_data[0])
      this.tableInfoService.setTableData(this.table)
      this.tableInfoService.stopSpinner(false)
    })
  }

  openModal() {
    
  }

}
