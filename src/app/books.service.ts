import { Cart } from './cart';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, findIndex, Observable } from 'rxjs';
import { TmplAstBoundAttribute } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class BooksService {
  totalQuantity:BehaviorSubject<number>=new BehaviorSubject<number>(0);
  totalPrice:BehaviorSubject<number>=new BehaviorSubject<number>(0);
  currentCart:Cart[] = [];
  cart:BehaviorSubject<Cart[]>= new BehaviorSubject<Cart[]>([]);
  tmp:Cart[] = []
  editedPrice:number=0;
  constructor( private _HttpClient:HttpClient) { 
    this.getCartFromStorage();
  }


  getBooks(book:string):Observable<any>{
    return this._HttpClient.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${book}&startIndex=0`)
  }
  
  updateCart(id:string, quantity:number =1 , price:string= '' , fromHome:boolean = false){
    
    //get current value
    this.cart.subscribe(()=>{ this.currentCart = this.cart.getValue(); });
    //convert string-price to number
    this.editedPrice=parseInt(price);

    // new cart 
    let newValue:Cart = {Id:id, Quantity:quantity ,Price:this.editedPrice};
    let isExist:boolean=false;
    
    //update quantity of books
    this.currentCart.findIndex((book)=>{      
      if (book.Id==newValue.Id) {
        if(fromHome){
          book.Quantity+=newValue.Quantity;
        }
        else{
          
          book.Quantity = newValue.Quantity
                    
        }
        isExist=true;
      }   
    });
    //add new book
    if(!isExist){
      this.cart.next([...this.currentCart , newValue ]);  
    }

    if(quantity<1)
      {
        this.removeFromCart(id)
      };
    // update total quantity 
    this.updateTotalQuantity(this.cart.getValue());
    
    // update total price 
    this.updateTotalPrice(this.cart.getValue());

    
    // save cart to storage 
    localStorage.setItem('Cart' , `${JSON.stringify(this.cart.getValue())}`);


  }
  getCartFromStorage(){
    if(localStorage.getItem('Cart')!=null){
      // load cart from local Storage 
      this.cart.next(JSON.parse(localStorage.getItem('Cart')|| '{}'));     
      //get total quantity 
      this.totalQuantity.next(0)
      for (const cartItem of this.cart.getValue()) {
        this.totalQuantity.next(this.totalQuantity.getValue()+cartItem.Quantity);      
      }
      //get total price
      this.totalPrice.next(0)
      for (const cartItem of this.cart.getValue()) {
        this.totalPrice.next(this.totalPrice.getValue()+(cartItem.Price*cartItem.Quantity));      
      }  
  }
  }
  getBookDeatails(id:string):Observable<any>{
    return this._HttpClient.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
  }

  removeFromCart(id:string):void{
    this.tmp= this.cart.value.filter((book)=>book.Id!=id)
    this.cart.next(this.tmp)
    console.log(this.cart.value);

    localStorage.setItem('Cart' , `${JSON.stringify(this.cart.getValue())}`);
  }
  updateTotalQuantity(cart:Cart[]):void{
    this.totalQuantity.next(0)
    for (const cartItem of cart) {
      this.totalQuantity.next(this.totalQuantity.getValue()+cartItem.Quantity);      
    }
  }
  updateTotalPrice(cart:Cart[]):void{
    this.totalPrice.next(0);
    for(const cartItem of cart){
      this.totalPrice.next(this.totalPrice.value+(cartItem.Price*cartItem.Quantity))
    }
  }
}
