import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestuarantService {

  constructor(private http:HttpClient) { }

  getCities():Observable<any>{
    return this.http.get("https://restaurantfoodapi.runasp.net/api/City/GetCities");
  }
  Search(CId:number ,restuarantName?:string):Observable<any>{
    let prams =new HttpParams();
    if(CId)prams=prams.append("cityId",CId);
    if(restuarantName)prams=prams.append("resturantName",restuarantName);

    return this.http.get("https://restaurantfoodapi.runasp.net/api/Restaurant/Search",{params:prams})
  }

  getRestaurantFood(restaurantID:number,page:number):Observable<any>{
    return this.http.get(`https://restaurantfoodapi.runasp.net/api/Restaurant/Menu?restaurantId=${restaurantID}&page=${page}`);
  }

  createOrder(data:any):Observable<any>{


    return this.http.post("https://restaurantfoodapi.runasp.net/api/Order",data);
  }
}
