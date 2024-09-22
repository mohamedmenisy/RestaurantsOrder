import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DataService } from '../Services/data.service';

export const customerGuard: CanActivateFn = (route, state) => {
  let _router=inject(Router);
  let dataservice=inject(DataService)
  let arr=[];
  dataservice.getOrderItemsData().subscribe({
    next:(response)=>{
      arr=response;
    }
  });
  if (arr.length > 0) {
    return true;
  }else{

    return _router.navigate([""]);
  }
};
