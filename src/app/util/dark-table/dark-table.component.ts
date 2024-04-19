import { Component } from '@angular/core';
import { TableInfoService } from 'src/app/services/table-info.service';

@Component({
  selector: 'app-dark-table',
  templateUrl: './dark-table.component.html',
  styleUrls: ['./dark-table.component.scss']
})
export class DarkTableComponent {

  title: any = "";
  subtitle: any = "";
  headers: any = []
  items: any = []
  pages: any = []
  item_keys: any = []


  clickedPage:number = 1
  spinnerActiveIndicator: boolean = false

  constructor(private tableInfoService: TableInfoService){}

  ngOnInit(): void {
    this.spinnerActiveIndicator = true
    this.tableInfoService.getTableData.subscribe((val) => {
      this.title = val.table_title
      this.subtitle = val.table_subtitle
      this.headers = val.table_headers
      this.items = val.table_data
      
      for (let index = 0; index < val.table_pages; index++) {
        this.pages.push(index+1)
      }
      
      this.item_keys = val.table_data_keys
      this.tableInfoService.getSpinnerStatus.subscribe((x) => this.spinnerActiveIndicator = x)
    })
  }
  
  changeCurrentPage(page: string) {
    this.spinnerActiveIndicator = true
    this.tableInfoService.changeCurrentPage(page)
    this.tableInfoService.getCurrentPage$.subscribe((val) => this.clickedPage = val)
  }

  openModal() {
    
  }

}
