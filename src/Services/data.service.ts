import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  private customerData = new BehaviorSubject({});
  private orderItemsData = new BehaviorSubject([]);
  private cityValue = new BehaviorSubject(0);

  setCustomerData(customer:any) {
    this.customerData.next(customer);
  }
  setOrderItemsData(orderItems:any) {
    this.orderItemsData.next(orderItems);
  }

  getCustomerData() {
    return this.customerData.asObservable();
  }

  getOrderItemsData() {
    return this.orderItemsData.asObservable();
  }
  setCityValue(Cid:number){
    this.cityValue.next(Cid);
  }
  getCityValue(){
    return this.cityValue.asObservable();
  }
}
