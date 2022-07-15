import { BooksService } from './../books.service';
import { Component, IterableDiffers, OnInit } from '@angular/core';
import { Router } from '@angular/router';


declare var $:any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchValue:string = '';
  totalQuantity:Number = 0; 
  totalPrice:Number = 0; 
  constructor(private _BooksService:BooksService ,private _Router:Router) { }
  ngOnInit(): void {
    // search
    $('.search__container')?.hide();
    $('#search').click(()=>{
        $('.search__container')?.slideToggle(300);
    })
    //total quantity
    this._BooksService.totalQuantity.subscribe(()=>{
      this.totalQuantity=0; 
      this.totalQuantity= this._BooksService.totalQuantity.getValue();    
    });
    //total price
    this._BooksService.totalPrice.subscribe(()=>{
      this.totalPrice=0; 
      this.totalPrice= this._BooksService.totalPrice.getValue();    
    });
  }

  search(value:string):void{
    console.log(value);
    this._BooksService.searchByName(value).subscribe((response)=>{
      let id:string =  response.items[0].id;
      
      this._Router.navigate(['/bookdetails',id]);
    })
  }
}
