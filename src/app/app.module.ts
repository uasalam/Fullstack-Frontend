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
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { OrderfilterPipe } from './pipes/orderfilter/orderfilter.pipe';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PendingOrdersComponent } from './components/pending-orders/pending-orders.component';
import { AcceptedOrdersComponent } from './components/accepted-orders/accepted-orders.component';
import { CompletedOrdersComponent } from './components/completed-orders/completed-orders.component';
import { RejectedOrdersComponent } from './components/rejected-orders/rejected-orders.component';
import { CancelledOrdersComponent } from './components/cancelled-orders/cancelled-orders.component';
import { RoomComponentComponent } from './pages/room-component/room-component.component';
import { ChatComponentComponent } from './pages/chat-component/chat-component.component';
import { NoOrdersComponent } from './components/no-orders/no-orders.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

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
    ErrorComponent,
    AllOrdersComponent,
    OrderfilterPipe,
    PendingOrdersComponent,
    AcceptedOrdersComponent,
    CompletedOrdersComponent,
    RejectedOrdersComponent,
    CancelledOrdersComponent,
    RoomComponentComponent,
    ChatComponentComponent,
    NoOrdersComponent,
    UnauthorizedComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
