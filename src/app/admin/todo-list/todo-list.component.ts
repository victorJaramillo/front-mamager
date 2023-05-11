import { Component, OnInit, ViewChild } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UtilService } from 'src/app/services/util.service';
import { environment as env } from 'src/environment/environment';
import { ModalInfoService } from 'src/app/services/modal-info.service';
import { ModalMessageComponent } from 'src/app/modal/modal-message/modal-message.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit  {
  @ViewChild('task_name') inputName:any;

  modalMessRef: MdbModalRef<ModalMessageComponent> | null = null;

  chores_to_do:any = []
  
  ngOnInit(): void {
    this.getChoresTodo()
  }
  headers = {apikey: env.API_KEY}

  constructor(
    private util: UtilService,
    private modalService: MdbModalService,
    private modalInfoService: ModalInfoService
  ){}

  getChoresTodo() {
    this.util.httpGetRequest(env.TO_DO_URL, this.headers).subscribe((res) => {
      this.chores_to_do =res
    })
  }

  newTask() {
    this.util.httpPostRequest(env.TO_DO_URL, {task_name: `${this.inputName.nativeElement.value}`}, this.headers).subscribe((res :any) => {
      this.modalInfoService.setProduct(res.message)
      this.modalInfoService.setBody(res.message)
      this.modalMessRef = this.modalService.open(ModalMessageComponent)
      this.inputName.nativeElement.value = ""
      this.getChoresTodo()
    })
  }
  
  public changeTaskStatus(event?: any, item?:any){
    const body:any = {status: event.target.checked}
    console.log(body);
    const { task_id } = item
    console.log(task_id);
    this.util.httpPutRequest(`${env.TO_DO_URL}/${task_id}`, body, this.headers).subscribe((res: any) => {
      this.modalInfoService.setProduct(res.message)
      this.modalInfoService.setBody(res.message)
      this.modalMessRef = this.modalService.open(ModalMessageComponent)
      this.getChoresTodo()
    }, err => {
      console.log(err);
      
      this.modalInfoService.setProduct(err.error.message)
      this.modalInfoService.setBody(err.message)
      this.modalMessRef = this.modalService.open(ModalMessageComponent)
    })
  }

}
