import { DataService } from './../../Services/data.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RestuarantService } from '../../Services/restaurant.service';
import { RestaurantComponent } from '../restaurant/restaurant.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    RestaurantComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
cities:any;
Restaurants:any[]=[]
cityId:number=0;
restaurantName= ""
errorMessage:boolean=false;
defaultVal:number=0;
ngOnInit(): void {
this.getCities();
this.data.getCityValue().subscribe({
  next:(response)=>{
    this.defaultVal=response;
  },
  error:(err)=>{
    this.defaultVal =0 ;
  }
})
if (this.defaultVal > 0) {


  this.restaurant.Search(this.defaultVal,this.restaurantName).subscribe({
    next:(response)=>{
      console.log(response);
      this.Restaurants=response;
      this.errorMessage=false;

    },
    error:(err)=>{
      console.log(err.error.message);
      this.Restaurants=[];
      this.errorMessage=true;
    }
  });
}
}



constructor(private restaurant:RestuarantService ,private data:DataService) {

}



TakeValue(event:Event){
  let element = event.target as HTMLInputElement
      console.log(element.value);

  this.cityId=Number(element.value);
  this.data.setCityValue(this.cityId);

}
getCities(){
  this.restaurant.getCities().subscribe({
    next:(response)=>{
      this.cities = [{id:0,name:"Cities"},...response];
      console.log(this.cities);

    },
    error:(err)=>{
      console.log(err);

    }
  })
}
Search(){


  this.restaurant.Search(this.cityId,this.restaurantName).subscribe({
    next:(response)=>{
      console.log(response);
      this.Restaurants=response;
      this.errorMessage=false;

    },
    error:(err)=>{
      console.log(err.error.message);
      this.Restaurants=[];
      this.errorMessage=true;
    }
  });
}
}
