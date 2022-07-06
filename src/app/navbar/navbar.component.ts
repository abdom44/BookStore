import { BehaviorSubject } from 'rxjs';
import { Cart } from './../cart';
import { BooksService } from './../books.service';
import { Component, IterableDiffers, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  totalQuantity:Number = 0; 
  totalPrice:Number = 0; 
  constructor(private _BooksService:BooksService) { }
  ngOnInit(): void {
    this._BooksService.totalQuantity.subscribe(()=>{
      this.totalQuantity=0; 
      this.totalQuantity= this._BooksService.totalQuantity.getValue();    
    });
    this._BooksService.totalPrice.subscribe(()=>{
      this.totalPrice=0; 
      this.totalPrice= this._BooksService.totalPrice.getValue();    
    });
  }

}
