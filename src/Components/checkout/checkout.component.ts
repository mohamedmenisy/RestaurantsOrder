import { RestuarantService } from './../../Services/restaurant.service';
import { Component } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
customerData:any;
orderItems:any[]=[];
total:number= 0;
constructor(private data:DataService,private restaurantservice:RestuarantService ,private router:Router) {

}
ngOnInit(): void {
 this.data.getCustomerData().subscribe({
  next:(response)=>{
    this.customerData =response;
    console.log(this.customerData);

  }
 })
this.data.getOrderItemsData().subscribe({
  next:(response)=>{
    this.orderItems=response;
    console.log(this.orderItems);

  }
});
}
CalcTotal(quantity:number,Price:number):number{
  return quantity*Price;
}
goback(){

  window.history.back();
}
deleteItem(item:any){
  this.orderItems = this.orderItems.filter(p => p.foodId !== item.foodId);
  this.data.setOrderItemsData(this.orderItems);
}
calcAll(){
  let total= 0;
  this.orderItems.forEach(element => {
    total += element.foodPrice*element.quantity
  });
  this.total=total;
  return total;
}
CreateOrder(){
 let Alldata = {
  customer:this.customerData,
  orderItems:this.orderItems,
  totalPrice:this.total
  }
  this.restaurantservice.createOrder(Alldata).subscribe({
    next:(res)=>{
      this.router.navigate([""])
      this.data.setOrderItemsData([]);
      this.data.setCustomerData({});
      this.data.setCityValue(0);

      Swal.fire({
        icon: "success",
        title: "Your order is on the way",
        background: "black",
        color: "#fff",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
       })
    },
    error:(err)=>{
      console.log(err);

    }
  });
}
incrementQuantity(food:any): void {
  food.quantity++;
}
decrementQuantity(food:any): void {
  if (food.quantity > 1) {
    food.quantity--;
  }
}
}
