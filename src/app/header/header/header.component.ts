import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  visible = false;
  showOption = false;

  colapseMenu= true;

  constructor() { }

  toggleOption(): void {
    this.showOption = !this.showOption;
  }

  menus(): void {

  }
}
