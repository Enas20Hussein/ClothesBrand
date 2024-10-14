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

export const routes: Routes = [

    {path: 'Login' , component:LoginComponent},
    {path: 'register' , component:RegisterComponent},
    {path: '' , component:HomeComponent},
    {path: 'Home' , component:HomeComponent},
    {path: 'product' , component:ProductComponent},
    {path: 'Contact' , component:ContactUSComponent},
    {path: 'Services' , component:OurServicesComponent},
    {path: 'Courses' , component:CourseComponent},
    {path: 'Cart' , component:CartComponent},
    {path: 'About' , component:AboutComponent},
    { path: 'product/:id', component: ProdDetailsComponent }, // Example route for product details
    { path: '', redirectTo: '/products', pathMatch: 'full' }



];
