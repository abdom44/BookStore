import { Component, OnInit , ViewEncapsulation, ViewChild} from '@angular/core';
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Pagination ,Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination]);
// install Swiper modules
SwiperCore.use([Navigation]);
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
