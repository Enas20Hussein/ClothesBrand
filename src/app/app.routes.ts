import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { ContactUSComponent } from './Components/contact-us/contact-us.component';
import { AboutComponent } from './Components/about/about.component';
import { ProductComponent } from './Components/product/product.component';
import { ProdDetailsComponent } from './Components/prod-details/prod-details.component';
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
import { CourseDetailsComponent } from './Components/course/courseDetail/course-detail/course-detail.component';
import { CourseCardComponent } from './Components/course/courseCard/course-card/course-card.component';
import { EnrollmentSuccessComponent } from './Components/enrollment-success/enrollment-success.component';
import { AlreadyEnrolledComponent } from './Components/already-enrolled/already-enrolled.component';
import { MyOrdersComponent } from './Components/my-orders/my-orders.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { MyCoursesComponent } from './Components/my-courses/my-courses.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { MyCustomOrdersComponent } from './Components/my-custom-orders/my-custom-orders.component';
import { authGuard } from './Guard/auth.guard';
import { Component } from '@angular/core';
import { ShopComponent } from './Components/shop/shop.component';

export const routes: Routes = [
    {path:'ccc',component:ProfileComponent,canActivate:[authGuard]},
    {path: 'Login' , component:LoginComponent},
    {path: 'register' , component:RegisterComponent},
    {path: '' , component:HomeComponent},
    {path: 'Home' , component:HomeComponent},
    {path: 'product' , component:ProductComponent},
    {path: 'Contact' , component:ContactUSComponent},
    {path: 'Services' , component:OurServicesComponent},
    {path: 'Courses' , component:CourseCardComponent},
    {path: 'Cart' , component:CartComponent,canActivate:[authGuard]},
    {path: 'About' , component:AboutComponent},
    { path: 'product/:id', component: ProdDetailsComponent ,canActivate:[authGuard]}, // Example route for product details
    { path: '', redirectTo: '/products', pathMatch: 'full' },


    { path: 'order', component: OrderComponent ,canActivate:[authGuard]},
    { path: 'order-confirmation', component: OrderComponent ,canActivate:[authGuard]},
    { path: 'Confirm-Order', component:CofirmedOrderComponent ,canActivate:[authGuard]},

   
    { path: 'Confirm-Order/:orderId', component:CofirmedOrderComponent },


    { path: 'Confirm-Order/:orderId', component:CofirmedOrderComponent,canActivate:[authGuard] },
    { path: 'order', component: OrderComponent ,canActivate:[authGuard]},
    { path: 'order-confirmation', component: OrderComponent ,canActivate:[authGuard]},
    { path: 'Confirm-Order', component:CofirmedOrderComponent ,canActivate:[authGuard]},

    { path: 'ForgetPassword', component:ForgetPasswordComponent },
    { path: 'ResetPassword', component:ResetPasswordComponent },
    { path: 'changePassword', component:ChangePasswordComponent ,canActivate:[authGuard]},
    { path: 'checkout/:orderId', component: CheckOutComponent,canActivate:[authGuard] },
    { path: 'course/:id', component: CourseDetailsComponent },
    { path: 'enrollment-success/:id', component: EnrollmentSuccessComponent,canActivate:[authGuard] },
    { path: 'already-enrolled', component: AlreadyEnrolledComponent,canActivate:[authGuard] },
   
    
    { path: 'profile', component: ProfileComponent,children: [
        { path: 'dashboard', component: DashboardComponent,canActivate:[authGuard] },
        { path: 'MyOrders', component: MyOrdersComponent,canActivate:[authGuard]  },
        { path: 'enrolled-courses', component: MyCoursesComponent,canActivate:[authGuard] },
        { path: 'custom-orders', component: MyCustomOrdersComponent,canActivate:[authGuard] },
        
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' }  // Default profile route
      ] },
   
    {path: 'create-order',component:CreateCustomOrderComponent,canActivate:[authGuard]},
    {path:'orders/:orderId',component:CustomOrderComponent,canActivate:[authGuard]},
    {path:'custom-orders',component:MyCustomOrdersComponent,canActivate:[authGuard]},
    




    { path: 'enrollment-success/:id', component: EnrollmentSuccessComponent },
    { path: 'already-enrolled', component: AlreadyEnrolledComponent },
    {path:'shop',component:ShopComponent}








];
