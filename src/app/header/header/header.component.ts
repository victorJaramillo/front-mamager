import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MdbCollapseDirective } from 'mdb-angular-ui-kit/collapse';
import { Router } from '@angular/router';
import { MdbDropdownDirective } from 'mdb-angular-ui-kit/dropdown';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  @ViewChild('collapse') dropDown!: MdbCollapseDirective;
  @ViewChild('basicCollapse') basicCollapse!: MdbCollapseDirective;
  @ViewChild('dropdownMenu') dropDownMenu!: MdbDropdownDirective;

  visible = false;
  showOption = false;
  showLogin = false;

  colapseMenu= true;

  enable_login_button:boolean= false
  innerWidth:any

  constructor(private router: Router) { }
  ngOnInit(): void {
    if(this.innerWidth != 390){
      this.enable_login_button = true
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth == 390){
      this.enable_login_button = false
    }else if(this.innerWidth != 390){
      this.enable_login_button = true
    }
  }

  toggleOption(): void {
    this.showOption = !this.showOption;
  }
  toggle(){
    this.dropDown.toggle()
  }

  login_btn() {
    this.enable_login_button = !this.enable_login_button
  }
  toggleBurger(){
    this.login_btn()
    this.basicCollapse.toggle()
  }

  showDropdownLoginMenu() {
    this.showLogin = !this.showLogin
  }

  navigateEnableServices() {
    this.router.navigate(['/admin/enabled-services']);
    setTimeout(() => {
      this.dropDown.hide()
      this.basicCollapse.hide()
      this.onResize()
    }, 500);
  }
  navigateApiKey() {
    this.router.navigate(['/admin/apikeys']);
    setTimeout(() => {
      this.dropDown.hide()
      this.basicCollapse.hide()
      this.onResize()
    }, 500);
  }
  navigateAnime() {
    this.router.navigate(['/admin/animes']);
    setTimeout(() => {
      this.dropDown.hide()
      this.basicCollapse.hide()
      this.onResize()
    }, 500);
  }
  navigateTodoList() {
    this.router.navigate(['/admin/todo-list']);
    setTimeout(() => {
      this.dropDown.hide()
      this.basicCollapse.hide()
      this.onResize()
    }, 500);
  }
  
  navigateCharts() {
    this.router.navigate(['/admin/charts']);
    setTimeout(() => {
      this.dropDown.hide()
      this.basicCollapse.hide()
      this.onResize()
    }, 500);
  }


}
