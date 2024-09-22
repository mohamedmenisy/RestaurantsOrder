import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DataService } from '../Services/data.service';

export const checkoutGuard: CanActivateFn = (route, state) => {
  let _router=inject(Router);
  let dataservice=inject(DataService)
  let customerobj={}
  dataservice.getOrderItemsData().subscribe({
    next:(response)=>{
      customerobj=response;
    }
  });
  if (Object.keys(customerobj).length === 0) {
    return _router.navigate([""])
  }else{

    return true;
  }
};
