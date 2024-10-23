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
import { CustomOrderComponent } from './Components/custom-order/custom-order.component';
import { CreateCustomOrderComponent } from './Components/create-custom-order/create-custom-order.component';
import { CourseDetailsComponent } from './Components/course/courseDetail/course-detail/course-detail.component';
import { CourseCardComponent } from './Components/course/courseCard/course-card/course-card.component';
import { EnrollmentSuccessComponent } from './Components/enrollment-success/enrollment-success.component';
import { AlreadyEnrolledComponent } from './Components/already-enrolled/already-enrolled.component';
import { Component } from '@angular/core';
import { ShopComponent } from './Components/shop/shop.component';

export const routes: Routes = [

    {path: 'Login' , component:LoginComponent},
    {path: 'register' , component:RegisterComponent},
    {path: '' , component:HomeComponent},
    {path: 'Home' , component:HomeComponent},
    {path: 'product' , component:ProductComponent},
    {path: 'Contact' , component:ContactUSComponent},
    {path: 'Services' , component:OurServicesComponent},
    {path: 'Courses' , component:CourseCardComponent},
    {path: 'Cart' , component:CartComponent},
    {path: 'About' , component:AboutComponent},
    { path: 'product/:id', component: ProdDetailsComponent }, // Example route for product details
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: 'order', component: OrderComponent },
    { path: 'order-confirmation', component: OrderComponent },
    { path: 'Confirm-Order/:orderId', component:CofirmedOrderComponent },
    { path: 'ForgetPassword', component:ForgetPasswordComponent },
    { path: 'ResetPassword', component:ResetPasswordComponent },
    { path: 'Confirm-Order', component:CofirmedOrderComponent },
    { path: 'checkout/:orderId', component: CheckOutComponent },
    {path: 'create-order',component:CreateCustomOrderComponent},
    {path:'orders/:orderId',component:CustomOrderComponent},
    { path: 'course/:id', component: CourseDetailsComponent },
    { path: 'enrollment-success/:id', component: EnrollmentSuccessComponent },
    { path: 'already-enrolled', component: AlreadyEnrolledComponent },
    {path:'shop',component:ShopComponent}








];
