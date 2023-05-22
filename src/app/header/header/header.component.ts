import { Component, ViewChild } from '@angular/core';
import { MdbCollapseDirective } from 'mdb-angular-ui-kit/collapse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @ViewChild('collapse') dropDown!: MdbCollapseDirective;
  @ViewChild('basicCollapse') basicCollapse!: MdbCollapseDirective;

  visible = false;
  showOption = false;

  colapseMenu= true;

  constructor(private router: Router) { }

  toggleOption(): void {
    this.showOption = !this.showOption;
  }
  toggle(){
    this.dropDown.toggle()
  }
  toggleBurger(){
    this.basicCollapse.toggle()
  }

  navigateEnableServices() {
    this.router.navigate(['/admin/enabled-services']);
    setTimeout(() => {
      this.dropDown.hide()
      this.basicCollapse.hide()
    }, 500);
  }
  navigateApiKey() {
    this.router.navigate(['/admin/apikeys']);
    setTimeout(() => {
      this.dropDown.hide()
      this.basicCollapse.hide()
    }, 500);
  }
  navigateAnime() {
    this.router.navigate(['/admin/animes']);
    setTimeout(() => {
      this.dropDown.hide()
      this.basicCollapse.hide()
    }, 500);
  }
  navigateTodoList() {
    this.router.navigate(['/admin/todo-list']);
    setTimeout(() => {
      this.dropDown.hide()
      this.basicCollapse.hide()
    }, 500);
  }


}
