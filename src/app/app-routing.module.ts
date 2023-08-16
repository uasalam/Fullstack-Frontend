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
import { RoomComponentComponent } from './pages/room-component/room-component.component';
import { ChatComponentComponent } from './pages/chat-component/chat-component.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AdminGuard } from './guards/admin/admin.guard';
import { StaffGuard } from './guards/staff/staff.guard';
import { AllGuard } from './guards/all/all.guard';
import { CustomerGuard } from './guards/customer/customer.guard';

const routes: Routes = [
  { path: 'home',   component: HomeComponent },
  { path: 'login',   component: LoginComponent },
  { path: 'registration',   component: RegistrationComponent },
  { path: 'place-order',   component: PlaceOrderComponent , canActivate: [CustomerGuard] },
  { path: 'profile',   component: ProfileComponent , canActivate: [AllGuard] },
  { path: 'customer',   component: CustomerComponent , canActivate: [StaffGuard] },
  { path: 'employee',   component: EmployeeComponent , canActivate: [AdminGuard] },
  { path: 'customer/orders',   component: CustomerOrdersComponent , canActivate: [AllGuard]},
  { path: 'customer/orders/:id',   component: CustomerOrderDetailsComponent , canActivate: [AllGuard] },
  { path: 'room',   component: RoomComponentComponent , canActivate: [AllGuard] },
  { path: 'room/:id',   component: ChatComponentComponent , canActivate: [AllGuard] },
  { path: 'unauthorized',   component: UnauthorizedComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
