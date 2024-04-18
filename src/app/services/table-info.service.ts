import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableInfoService {

  private $table_title = new BehaviorSubject<any>({});
  getTableTitle$ = this.$table_title.asObservable()
  private $table_subtitle = new BehaviorSubject<any>({});
  getTableSubTitle = this.$table_subtitle.asObservable()
  private $table_headers = new BehaviorSubject<any>({});
  getTableHeaders = this.$table_headers.asObservable()
  private $table_data = new BehaviorSubject<any>({});
  getTableData = this.$table_data.asObservable()

  constructor() { }

  setTableTitle(title: any) {
    this.$table_title.next(title)
  }
  setTableSubTitle(subtitle: any) {
    this.$table_subtitle.next(subtitle)
  }
  setTableHeaders(headers: any) {
    this.$table_headers.next(headers)
  }
  setTableData(data: any) {
    this.$table_data.next(data)
  }
}
