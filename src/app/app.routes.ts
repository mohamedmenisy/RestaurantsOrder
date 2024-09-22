import { Routes } from '@angular/router';
import { MenuComponent } from '../Components/menu/menu.component';
import { HomeComponent } from '../Components/home/home.component';
import { CustomerComponent } from '../Components/customer/customer.component';
import { CheckoutComponent } from '../Components/checkout/checkout.component';
import { customerGuard } from '../Guards/customer.guard';
import { checkoutGuard } from '../Guards/checkout.guard';

export const routes: Routes = [
    {path:"" ,component:HomeComponent ,title:"Home"},
    {path:"menu/:id" ,component:MenuComponent ,title:"Menu"},
    {path:"customer" ,component:CustomerComponent ,title:"Customer",canActivate:[customerGuard]},
    {path:"checkout" ,component:CheckoutComponent ,title:"checkout",canActivate:[checkoutGuard]}
];
