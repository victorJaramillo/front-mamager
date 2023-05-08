import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from 'src/app/modal/modal.component';
import { UtilService } from 'src/app/services/util.service';
import { environment as env } from 'src/environment/environment';
import { ModalInfoService } from 'src/app/services/modal-info.service';
import { ModalMessageComponent } from 'src/app/modal/modal-message/modal-message.component';
import { ModalNewApikeyComponent } from 'src/app/modal/modal-new-apikey/modal-new-apikey.component';
import { ModalApikeyDetailsComponent } from 'src/app/modal/modal-apikey-details/modal-apikey-details.component';
import { ModalApikeyValuesComponent } from 'src/app/modal/modal-apikey-values/modal-apikey-values.component';

@Component({
  selector: 'app-apikeys',
  templateUrl: './apikeys.component.html',
  styleUrls: ['./apikeys.component.scss']
})
export class ApikeysComponent  implements OnInit{

  modalRef: MdbModalRef<ModalComponent> | null = null;
  modalMessRef: MdbModalRef<ModalMessageComponent> | null = null;
  modalNewApikeyRef: MdbModalRef<ModalNewApikeyComponent> | null = null;
  modalDetailsApikeyRef: MdbModalRef<ModalApikeyDetailsComponent> | null = null;
  modalValuesApikeyRef: MdbModalRef<ModalApikeyValuesComponent> | null = null;

  headers: any = { 'apikey': env.API_KEY }
  configured_apikeys_url: any = env.CONFIGURED_APIKEYS_URL

  spinnerActive: Boolean = false
  spinnerActiveIndicator: Boolean = false
  configuredApiKeys:any = []

  clickedPage: any = 1;
  pages:any = []
  queryParams:any = {}

  constructor(
    private util: UtilService,
    private modalService: MdbModalService,
    private modalInfoService: ModalInfoService
    ){}

  ngOnInit(): void {
    this.getApiKeys()
  }

  getApiKeys(params?:any) {
    this.util.httpGetRequest(this.configured_apikeys_url, this.headers).subscribe((res) => {
      this.configuredApiKeys = res
      for (let index = 0; index < this.configuredApiKeys.totalPages; index++) {
        this.pages.push(index + 1)
      }
      this.spinnerActiveIndicator = false
    })
  }

  public changeCurrentPage(value: any) {
    this.spinnerActiveIndicator = true
    this.clickedPage = value;
    this.queryParams = {}
    this.queryParams.currentPage = value
    var queryString = this.util.buildQueryString(this.queryParams)
    this.getApiKeys(queryString)
  }

  public openModal() {
    this.modalRef = this.modalService.open(ModalNewApikeyComponent)
  }

  public openModalDetails() {
    this.modalRef = this.modalService.open(ModalApikeyDetailsComponent)
  }
  
  public openModalValues() {
    this.modalRef = this.modalService.open(ModalApikeyValuesComponent)
  }
}
