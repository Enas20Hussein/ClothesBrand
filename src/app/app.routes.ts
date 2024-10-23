import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { ContactUSComponent } from './Components/contact-us/contact-us.component';
import { AboutComponent } from './Components/about/about.component';
import { ProductComponent } from './Components/product/product.component';
import { ProdDetailsComponent } from './Components/prod-details/prod-details.component';
import { CourseComponent } from './Components/course/course/course.component';
import { CartComponent } from './Components/cart/cart.component';
import { OurServicesComponent } from './Components/our-services/our-services.component';
import { OrderComponent } from './Components/order/order.component';
import { CofirmedOrderComponent } from './Components/cofirmed-order/cofirmed-order.component';


import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';

import { CheckOutComponent } from './Components/check-out/check-out.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';



import { CustomOrderComponent } from './Components/custom-order/custom-order.component';
import { CreateCustomOrderComponent } from './Components/create-custom-order/create-custom-order.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { authGuard } from './Guard/auth.guard';


export const routes: Routes = [
    {path:'ccc',component:ProfileComponent,canActivate:[authGuard]},
    {path: 'Login' , component:LoginComponent},
    {path: 'register' , component:RegisterComponent},
    {path: '' , component:HomeComponent},
    {path: 'Home' , component:HomeComponent},
    {path: 'product' , component:ProductComponent},
    {path: 'Contact' , component:ContactUSComponent},
    {path: 'Services' , component:OurServicesComponent},
    {path: 'Courses' , component:CourseComponent},
    {path: 'Cart' , component:CartComponent,canActivate:[authGuard]},
    {path: 'About' , component:AboutComponent},
    { path: 'product/:id', component: ProdDetailsComponent ,canActivate:[authGuard]}, // Example route for product details
    { path: '', redirectTo: '/products', pathMatch: 'full' },

    { path: 'order', component: OrderComponent ,canActivate:[authGuard]},
    { path: 'order-confirmation', component: OrderComponent ,canActivate:[authGuard]},
    { path: 'Confirm-Order', component:CofirmedOrderComponent ,canActivate:[authGuard]},

   
    { path: 'Confirm-Order/:orderId', component:CofirmedOrderComponent },

    { path: 'ForgetPassword', component:ForgetPasswordComponent },
    { path: 'ResetPassword', component:ResetPasswordComponent },

    { path: 'changePassword', component:ChangePasswordComponent ,canActivate:[authGuard]},

    { path: 'checkout/:orderId', component: CheckOutComponent },


    { path: 'Confirm-Order', component:CofirmedOrderComponent ,canActivate:[authGuard]},

    {path: 'create-order',component:CreateCustomOrderComponent,canActivate:[authGuard]},
    {path:'orders/:orderId',component:CustomOrderComponent,canActivate:[authGuard]},
    







];
