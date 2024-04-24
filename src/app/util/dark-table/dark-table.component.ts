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

  editItem:boolean = false;
  editItemIndex = null

  constructor(private tableInfoService: TableInfoService, private modalTemplate: ModalEditValuesTemplateService){}

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

  // openModal(item: any) {
  //   const itemKeys = Object.keys(item)
  //   var modalValues:any = {}
  //   modalValues.inputNames = itemKeys
  //   modalValues.inputValues = item

  //   this.modalTemplate.setValuesTemplate(modalValues)
  //   this.tableInfoService.openModal(true)
  // }

  editting(ind: any) {
    this.editItemIndex = ind
    this.editItem = true
  }
  
  saveEdditedItem(item: any){
    item[this.item_keys[0]] = this.inputValues.nativeElement.value
    
    console.log(item);
    
    this.editItem = false
    this.editItemIndex = null
  }

}
