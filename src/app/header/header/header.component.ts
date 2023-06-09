import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MdbCollapseDirective } from 'mdb-angular-ui-kit/collapse';
import { Router } from '@angular/router';
import { SlideInOutAnimation } from 'src/app/animation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [SlideInOutAnimation]
})
export class HeaderComponent implements OnInit{

  @ViewChild('collapse') dropDownAdminMenu!: MdbCollapseDirective;
  @ViewChild('basicCollapse') basicCollapse!: MdbCollapseDirective;

  @ViewChild('username') username:any;
  @ViewChild('password') password:any;
  
  animationState = 'out';

  visible = false;
  showOption = false;
  showLogin = true;
  enable_login_button = true;

  colapseMenu= true;

  innerWidth:any
  mobileMode:boolean=false
  spinnerActive=false
  isLogedIn= false

  constructor(private router: Router) { }
  ngOnInit(): void {
    this.onResize()
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.mobileMode = (this.innerWidth == 390)
  }

  toggleOption(): void {
    this.showOption = !this.showOption;
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
  }

  toggleAdminMenu(){
    this.dropDownAdminMenu.toggle()
  }

  toggleBurger(){
    this.basicCollapse.toggle()    
    if(this.mobileMode){
      if(this.basicCollapse.collapsed){this.enable_login_button = false}
      else {this.enable_login_button = true}
    }
  }

  showDropdownLoginMenu() {
    this.showLogin = true;    
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
  }

  signin(){
    const username = this.username.nativeElement.value
    const password = this.password.nativeElement.value
    this.spinnerActive = true
    setTimeout(() => {
      this.isLogedIn = true
      this.spinnerActive = false
      this.showLogin = false
    }, 2000);
    
  }

  logOut() {
    this.isLogedIn = false
  }

  navigateHome() {
    this.router.navigate(['/']);
    setTimeout(() => {
      this.dropDownAdminMenu.hide()
      this.basicCollapse.hide()
      this.onResize()
    }, 500);

  }
  navigateEnableServices() {
    this.router.navigate(['/admin/enabled-services']);
    setTimeout(() => {
      this.dropDownAdminMenu.hide()
      this.basicCollapse.hide()
      this.onResize()
    }, 500);
  }
  navigateApiKey() {
    this.router.navigate(['/admin/apikeys']);
    setTimeout(() => {
      this.dropDownAdminMenu.hide()
      this.basicCollapse.hide()
      this.onResize()
    }, 500);
  }
  navigateAnime() {
    this.router.navigate(['/admin/animes']);
    setTimeout(() => {
      this.dropDownAdminMenu.hide()
      this.basicCollapse.hide()
      this.onResize()
    }, 500);
  }
  navigateTodoList() {
    this.router.navigate(['/admin/todo-list']);
    setTimeout(() => {
      this.dropDownAdminMenu.hide()
      this.basicCollapse.hide()
      this.onResize()
    }, 500);
  }
  
  navigateCharts() {
    this.router.navigate(['/admin/charts']);
    setTimeout(() => {
      this.dropDownAdminMenu.hide()
      this.basicCollapse.hide()
      this.onResize()
    }, 500);
  }
}
