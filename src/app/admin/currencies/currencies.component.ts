import { Component } from '@angular/core';
import { TableInfoService } from 'src/app/services/table-info.service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent {

  table: any = {
    table_title: "Currencies",
    table_subtitle: "Scraping Currencies",
    table_headers: ["Value","Date","Action"],
    table_data: [
      {first_column: 950, second_column: '2024-04-18'}, 
      {first_column: 930, second_column: '2024-04-17'},
      {first_column: 930, second_column: '2024-04-16'},
      {first_column: 930, second_column: '2024-04-15'},
      {first_column: 930, second_column: '2024-04-15'},
      {first_column: 930, second_column: '2024-04-15'},
      {first_column: 915, second_column: '2024-04-15'},
      {first_column: 930, second_column: '2024-04-15'},
      {first_column: 930, second_column: '2024-04-15'},
      {first_column: 890, second_column: '2024-04-15'},
    ],
    table_pages: 4,
  }
  constructor(private tableInfoService: TableInfoService){}

  
  ngOnInit(): void {
    this.table.table_data_keys= Object.keys(this.table.table_data[0])
    this.tableInfoService.setTableData(this.table)
  }

  changeCurrentPage(page: any){

  }

  openModal() {
    
  }

}
