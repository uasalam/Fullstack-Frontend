import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { CustomerOrdersComponent } from './pages/customer-orders/customer-orders.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CustomerOrderDetailsComponent } from './pages/customer-order-details/customer-order-details.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { DetailComponent } from './components/detail/detail.component';
import { SecurityComponent } from './components/security/security.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { SuccessComponent } from './components/success/success.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaceOrderComponent,
    CustomerOrdersComponent,
    HomeComponent,
    ProfileComponent,
    CustomerOrderDetailsComponent,
    LoginComponent,
    RegistrationComponent,
    DetailComponent,
    SecurityComponent,
    EmployeeComponent,
    CustomerComponent,
    SuccessComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
