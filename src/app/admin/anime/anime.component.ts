import { Component } from '@angular/core';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.scss']
})
export class AnimeComponent {
  spinnerActiveIndicator: boolean = false;
  indicatorStatus: Boolean = false;
  statusText: string = 'Down'
}
