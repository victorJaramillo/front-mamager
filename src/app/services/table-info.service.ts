import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableInfoService {

  private $current_page = new BehaviorSubject<any>({});
  getCurrentPage$ = this.$current_page.asObservable()
  
  private $table_data = new BehaviorSubject<any>({});
  getTableData = this.$table_data.asObservable()
  
  private $stop_table_spinner = new BehaviorSubject<any>({});
  getSpinnerStatus = this.$stop_table_spinner.asObservable()
  
  private $open_modal = new BehaviorSubject<any>({});
  openModalStatus = this.$open_modal.asObservable()
  
  private $edit_item = new BehaviorSubject<any>({});
  getEditItem = this.$edit_item.asObservable()
  
  constructor() { }

  changeCurrentPage(page: any) {
    this.$current_page.next(page)
  }

  setTableData(data: any) {
    this.$table_data.next(data)
  }

  stopSpinner(val:boolean) {
    this.$stop_table_spinner.next(val)
  }
  openModal(val:boolean){
    this.$open_modal.next(val)
  }

  setEditItem(item: any) {
    this.$edit_item.next(item)
  }
}
