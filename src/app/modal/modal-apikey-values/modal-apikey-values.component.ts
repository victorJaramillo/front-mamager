import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

import { MdbCarouselComponent } from 'mdb-angular-ui-kit/carousel';

@Component({
  selector: 'app-modal-apikey-values',
  templateUrl: './modal-apikey-values.component.html',
  styleUrls: ['./modal-apikey-values.component.scss']
})
export class ModalApikeyValuesComponent implements AfterViewInit, OnInit {
  constructor(public modalRef: MdbModalRef<ModalApikeyValuesComponent>){}
  @ViewChild('carousel') carousel!: MdbCarouselComponent;
  
  ngOnInit(): void {
    
    this.image_active = 0
  }
  
  ngAfterViewInit(): void {
    this.carousel.pause = false
    this.carousel.stop()
    // this.carousel.to(1)
  }

  arr_images:any = [{image: 'https://mdbcdn.b-cdn.net/img/new/slides/041.webp'}, 
  {image: 'https://mdbcdn.b-cdn.net/img/new/slides/042.webp'},
  {image: 'https://mdbcdn.b-cdn.net/img/new/slides/043.webp'}]

  image_active:any

  onSlideChange(): void {
    console.log('slide change');
  }

  nextPage(item:any) {
    this.image_active = item._activeSlide  
    this.carousel.next()
  }

  prevPage(item:any) {
    this.image_active = item._activeSlide  
    this.carousel.prev()
  }
}
