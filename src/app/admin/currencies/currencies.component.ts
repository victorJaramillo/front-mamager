import { Component } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Observable } from 'rxjs';
import { ModalEditTwoValuesComponent } from 'src/app/modal/modal-edit-values-template/modal-edit-two-values.component';
import { ModalEditValuesTemplateService } from 'src/app/services/modal-edit-values-template.service';
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
    table_headers: ["Value","Name","Date","Action"],
    table_pages: 4,
    table_edit: true,
    table_details: false,
  }

  modalEdit: any = {
    modalTitle: "Edit Currencies",
    modalSubtitle: "Editing Sraping Currencies"
  }

  current_page:any = 1;

  constructor(private tableInfoService: TableInfoService, 
    private util: UtilService,
    private modalService: MdbModalService,
    private modalTemplate: ModalEditValuesTemplateService){}

  
  ngOnInit(): void {
    this.loadCurrencyValues()    
    this.tableInfoService.getCurrentPage$.
    subscribe((val) => this.changeCurrentPage(val))

    this.tableInfoService.openModalStatus.
    subscribe((val) => {
      if(val === true){
        this.openModal(val)
      }
    })
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

  openModal(val:boolean) {
    this.modalTemplate.getEditValuesTemplate$.subscribe((values) => {
      const modalItemKeys = Object.keys(values)
      modalItemKeys.map((x) => {
        this.modalEdit[x] = values[x]
      })
      this.modalTemplate.setValuesTemplate(this.modalEdit)
    })


    this.modalService.open(ModalEditTwoValuesComponent)
  }

}
