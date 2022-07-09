import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  comments:any[]=[
    {name:'Jane Doe' , date: 'JULY 29, 2019' , content:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.' , img:'../../assets/imges/avatar-1-100x100.png'},
    {name:'Jessica Johnson' , date: 'JULY 29, 2019' , content:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.',img:'../../assets/imges/avatar-2-100x100.png'},
    {name:'James Hoffman' , date: 'JULY 29, 2019' , content:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.' , img:'../../assets/imges/avatar-3-100x100.png'}
  ]
  clickedIndex:boolean[]= [false,false,false];
  constructor() { }

  ngOnInit(): void {
  }

  replyForm(index:number ,event:any):void{
    // event.target.innerHTML= `reply to ${this.comments[index].name}`
    
    console.log (this.clickedIndex);
    // event.target.classList.add('text-danger')
    for (let i in this.clickedIndex)
    if(this.clickedIndex[i]==this.clickedIndex[index])
      this.clickedIndex[i]=true;
    else this.clickedIndex[i]=false;    
    console.log(this.clickedIndex);
    
    
  }
  
}
