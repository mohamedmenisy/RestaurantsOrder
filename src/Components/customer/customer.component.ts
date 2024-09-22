import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [FormsModule ,ReactiveFormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  customerData:any;
constructor(private router:Router,private dataservice:DataService) {


}
ngOnInit(): void {
this.getData();
}

customerForm:FormGroup= new FormGroup({
  name:new FormControl('',[Validators.required , Validators.minLength(3), Validators.maxLength(20) ]),
  address:new FormControl('',[Validators.required , Validators.minLength(3), Validators.maxLength(20) ]),
  email:new FormControl('',[Validators.required ,Validators.email]),
  phone:new FormControl('',[Validators.required,Validators.pattern(/^01[0152][0-9]{8}$/)]),


})
getData(){
  this.dataservice.getCustomerData().subscribe({
    next:(response)=>{
      this.customerData =response;
      this.customerForm.patchValue({
        name: this.customerData.name,
        address: this.customerData.address,
        email: this.customerData.email,
        phone: this.customerData.phone
      });

    }
   })


}
goBack(event:Event){
  event.preventDefault();
  window.history.back();
}
confirmOrder(){
  this.dataservice.setCustomerData(this.customerForm.value)
  this.router.navigate(["/checkout"])

}
}
