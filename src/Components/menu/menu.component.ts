import { Component } from '@angular/core';
import { RestuarantService } from '../../Services/restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  pramsValue:any;
  Foods:any[]=[];
  selectedFood:any[] =[]
  totalPages:number=0;
  pagenumber:number=1;
  constructor(private restaurant:RestuarantService,private route:ActivatedRoute,private dataservice:DataService ,private router:Router) {
  }
  ngOnInit(): void {
  this.pramsValue = Number(this.route.snapshot.paramMap.get("id"));
    this.getFood();
    this.dataservice.getOrderItemsData().subscribe({
      next:(response)=>{
        this.selectedFood=response;


      }
    });
  }

getFood(){
this.restaurant.getRestaurantFood(this.pramsValue,this.pagenumber).subscribe({
  next:(response)=>{
   this.Foods=response.orederItems;
   console.log(response);
   this.totalPages=response.totalPages
  },
  error:(err)=>{
    console.log(err);
  }
});
}

isSelected(food: any): boolean {
  return this.selectedFood.some(f => f.foodId === food.foodId);
}
onCheckboxChange(event: any, food: any) {
  if (event.target.checked) {


    this.selectedFood.push(food);

  } else {

    this.selectedFood = this.selectedFood.filter(p => p.foodId !== food.foodId);


  }
  this.dataservice.setOrderItemsData(this.selectedFood);
}
goNext(){
  this.dataservice.setOrderItemsData(this.selectedFood);
  this.router.navigate(["/customer"])
}
goback(){
  window.history.back();
}
prevPage(){
  if (this.pagenumber >1 ) {
    this.pagenumber--
  }
  this.getFood();
}
nextPage(){

  this.pagenumber++
  if (this.pagenumber>this.totalPages) {
    this.pagenumber=this.totalPages
  }
  this.getFood();
}
}
