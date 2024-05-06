import { Component, ViewChild } from '@angular/core';
import { ModalEditValuesTemplateService } from 'src/app/services/modal-edit-values-template.service';
import { TableInfoService } from 'src/app/services/table-info.service';

@Component({
  selector: 'app-dark-table',
  templateUrl: './dark-table.component.html',
  styleUrls: ['./dark-table.component.scss']
})
export class DarkTableComponent {

  @ViewChild('val') inputValues:any;

  title: any = "";
  subtitle: any = "";
  headers: any = []
  items: any = []
  pages: any = []
  item_keys: any = []
  edit:boolean = false
  details:boolean = false

  clickedPage:number = 1
  spinnerActiveIndicator: boolean = false
  spinnerActive: boolean = false

  editItem:boolean = false;
  editItemIndex = null
  editTableRowIndex:number = 0

  constructor(private tableInfoService: TableInfoService, private modalTemplate: ModalEditValuesTemplateService){}

  ngOnInit(): void {
    this.spinnerActiveIndicator = true
    this.tableInfoService.getTableData.subscribe((val) => {
      this.title = val.table_title
      this.subtitle = val.table_subtitle
      this.headers = val.table_headers
      this.items = val.table_data
      this.editTableRowIndex = val.table_edit_row_index
      for (let index = 0; index < val.table_pages; index++) {
        this.pages.push(index+1)
      }
      
      if(val.table_edit) {
        this.edit = val.table_edit
      }
      if(val.table_details) {
        this.details = val.table_details
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

  editting(ind: any) {
    this.editItemIndex = ind
    this.editItem = true
  }
  
  saveEdditedItem(item: any){
    item[this.item_keys[this.editTableRowIndex]] = this.inputValues.nativeElement.value
    
    this.spinnerActive = true
    console.log(item);
    this.tableInfoService.setEditItem(item)
    setTimeout(() => {
      this.spinnerActive = false
      this.editItem = false
      this.editItemIndex = null
    }, 1500);
  }

}
