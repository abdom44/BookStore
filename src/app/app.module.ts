import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { BlogComponent } from './blog/blog.component';
import { EventComponent } from './event/event.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SwiperComponent, SwiperModule } from 'swiper/angular';
import { SliderComponent } from './slider/slider.component';
import { HttpClientModule } from '@angular/common/http';
import { BookDetailsComponent } from './book-details/book-details.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ShopComponent,
    BlogComponent,
    EventComponent,
    ContactUsComponent,
    NotFoundComponent,
    SliderComponent,
    BookDetailsComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SwiperModule,  
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
