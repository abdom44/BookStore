import { BooksService } from './../books.service';
import { Swiper } from 'swiper';
import { Component, OnInit } from '@angular/core';
import SwiperCore, { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _BooksService:BooksService ) { }
  Books:any[] = [];
  isAdded:boolean[] = [false];
  itemsPrice:string[]=[];
  ngOnInit(): void {
    let all =document.getElementById('all');
    all?.click();
  }
  addtocart(id:string , price:string ='',quantity:number =1 , index:any , formHome:boolean){
    
    this.isAdded[index] =true
    this._BooksService.updateCart(id,quantity,price , formHome);

  }
  filter(subject:string , e:any =null):void{
    let btns =   document.querySelectorAll('.filter button');
    for (const i in btns) {
      console.log();
      
      btns[i].classList?.remove('actives');

    }
    e.target.classList.add('actives');
    this._BooksService.getBooks(`${subject}`).subscribe((respnose)=>{
      this.Books = respnose.items
      for (const item of this.Books) {
        if ( item.saleInfo.saleability==='FOR_SALE') 
          this.itemsPrice.push(item.saleInfo.listPrice.amount); 
        else if (item.saleInfo.saleability==='FREE')
          this.itemsPrice.push('00.00');       
        else if (item.saleInfo.saleability==='NOT_FOR_SALE')        
          this.itemsPrice.push('Out Of Stock');
        else
          this.itemsPrice.push(item.saleInfo.saleability);
      }      
    });
  }

}
