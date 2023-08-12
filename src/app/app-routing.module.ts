import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CustomerOrdersComponent } from './pages/customer-orders/customer-orders.component';
import { CustomerOrderDetailsComponent } from './pages/customer-order-details/customer-order-details.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { EmployeeComponent } from './pages/employee/employee.component';

const routes: Routes = [
  { path: 'home',   component: HomeComponent },
  { path: 'login',   component: LoginComponent },
  { path: 'registration',   component: RegistrationComponent },
  { path: 'place-order',   component: PlaceOrderComponent },
  { path: 'profile',   component: ProfileComponent },
  { path: 'customer',   component: CustomerComponent },
  { path: 'employee',   component: EmployeeComponent },
  { path: 'customer/orders',   component: CustomerOrdersComponent },
  { path: 'customer/order/id',   component: CustomerOrderDetailsComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  //{ path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
