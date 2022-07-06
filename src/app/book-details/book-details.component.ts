import { BooksService } from './../books.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  constructor(private _BooksService:BooksService , private _ActivatedRoute:ActivatedRoute) { }

  id:string = ''
  price:string = ''
  BookDetails:any ={};
  quantity:number= 0;
  isNumber:boolean=false;
  additionalInfo:any;
  text:string = '';
  ngOnInit(): void {
    document.getElementById('desc')?.click();
     let x:any=document.getElementById('info'); 
     
    this.id= this._ActivatedRoute.snapshot.params['id'];
    this._BooksService.getBookDeatails(this.id).subscribe((Response)=>{
      this.BookDetails = Response;
      
      if (this.BookDetails.saleInfo.saleability ==='FOR_SALE')
        this.price = this.BookDetails.saleInfo.listPrice.amount;
      else if(this.BookDetails.saleInfo.saleability==='FREE')       
        this.price ='00.00';

      else if (this.BookDetails.saleInfo.saleability==='NOT_FOR_SALE')
        this.price = 'Out Of Stock';
      else
        this.price  =this.BookDetails.saleInfo.saleability;
    });
    this._BooksService.cart.subscribe(()=>{
      this._BooksService.cart.value.findIndex((bookItem)=>{
        if(bookItem.Id ==this.id )
          this.quantity=bookItem.Quantity;
      })
    })
    
  }

  addToCart(id:string , quantity:number , price:string , fromHome:boolean){
    this._BooksService.updateCart(id,quantity,price , fromHome);  
  }

}

