import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
titles:string[]=['Bookstore Central','Bookstore 1','Bookstore 2','Publisher'];
  constructor() { }

  ngOnInit(): void {


  }
}
// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule, Component } from '@angular/core';

// import { AgmCoreModule } from '@agm/core';

// @Component({
//   selector: 'app-root',
//   styles: [`
//     agm-map {
//       height: 300px;
//     }
//   `],
// template: `  <agm-map [latitude]="lat" [longitude]="lng"></agm-map>`
// })
// export class AppComponent {
//   lat: number = 51.678418;
//   lng: number = 7.809007;
// }

// @NgModule({
//   imports: [
//     BrowserModule,
//     AgmCoreModule.forRoot({
//       apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
//     })
//   ],
//   declarations: [ AppComponent ],
//   bootstrap: [ AppComponent ]
// })
// export class AppModule {}
	