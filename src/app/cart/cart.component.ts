import { BehaviorSubject } from 'rxjs';
import { Cart } from './../cart';
import { BooksService } from './../books.service';
import { Component, OnInit } from '@angular/core';
BooksService
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
posters:string[]=[];
titles:string[]=[];
cart:BehaviorSubject<Cart[]>= new BehaviorSubject<Cart[]>([]);
isDeleted:BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);
Deleted:boolean = false;
constructor(public _BooksService:BooksService ,  ) { }

  ngOnInit(): void {
    this.isDeleted.subscribe(()=>{
      this.Deleted = this.isDeleted.getValue();
    })
    this._BooksService.cart.subscribe(()=>{
      this.cart.next(this._BooksService.cart.value);
      this.GetCartDetails(this._BooksService.cart.value);
    })
    // this.cart.subscribe(()=>{
    //   this._BooksService.cart.next(this.cart.value)
    // })
  }
  GetCartDetails(cart:Cart[]):void{
    for (const cartItem in cart) {
        this._BooksService.getBookDeatails(cart[cartItem].Id).subscribe((Response)=>{
          this.cart.value[cartItem].Poster = Response.volumeInfo.imageLinks.thumbnail;
          this.cart.value[cartItem].Title = Response.volumeInfo.title;
        });
    }
  }
  decreaseQty(id:string):void{

    this._BooksService.cart.value.findIndex((cart)=>{      
      if(cart.Id==id && cart.Quantity>1)   
        this._BooksService.updateCart(id,cart.Quantity-=1 , cart.Price.toString(),false)
    })
  }
  inCreaseQty(id:string):void{
    this._BooksService.cart.value.findIndex((cart)=>{      
      if(cart.Id==id)   
        this._BooksService.updateCart(id,cart.Quantity+=1 , cart.Price.toString(),false)
    })
  }
  removeFromCart(id:string , e:any):void{

    console.log(e.target);
    this.isDeleted.next(true);
    console.log(this.Deleted);
    
    
    // this._BooksService.cart.value.findIndex((cart)=>{      
    //   if(cart.Id==id){
    //     this._BooksService.updateCart(id,0, cart.Price.toString(),false);
    //   }
    // })
    this._BooksService.removeFromCart(id);
    
    this._BooksService.updateTotalPrice(this._BooksService.cart.getValue());

    this._BooksService.updateTotalQuantity(this._BooksService.cart.getValue());
  }
}
