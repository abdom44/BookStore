import { BehaviorSubject } from 'rxjs';
import { BooksService } from './../books.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var $:any;


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})

export class BookDetailsComponent implements OnInit {
  constructor(private _BooksService:BooksService , private _ActivatedRoute:ActivatedRoute , private _Router:Router) { }

  id:string = ''
  price:string = ''
  BookDetails:BehaviorSubject<any> =new BehaviorSubject<any>({});
  quantity:number= 0;
  isNumber:boolean=false;
  additionalInfo:any;
  text:string = '';
  ngOnInit(): void {
    $('.view').hide();

    this._Router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.id= this._ActivatedRoute.snapshot.params['id'];
    this._BooksService.getBookDeatails(this.id).subscribe((Response)=>{
      this.BookDetails.next(Response);
      
      if (this.BookDetails.value.saleInfo.saleability ==='FOR_SALE')
        this.price = this.BookDetails.value.saleInfo.listPrice.amount;
      else if(this.BookDetails.value.saleInfo.saleability==='FREE')       
        this.price ='00.00';

      else if (this.BookDetails.value.saleInfo.saleability==='NOT_FOR_SALE')
        this.price = 'Out Of Stock';
      else
        this.price  =this.BookDetails.value.saleInfo.saleability;
    });

    this._BooksService.cart.subscribe(()=>{
      this._BooksService.cart.value.findIndex((bookItem)=>{
        if(bookItem.Id ==this.id )
          this.quantity=bookItem.Quantity;
      })
    })
    
    document.getElementById('desc')?.click();

  }


  addToCart(id:string , quantity:number , price:string , fromHome:boolean){
    $('.view').show();
    $('html, body').animate({
      scrollTop: $(".view").offset().top -150
  }, 300);
    this._BooksService.updateCart(id,quantity,price , fromHome);  
  }

}

