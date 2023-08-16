import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  constructor(private orderService: OrderService, private authService: AuthService, private employeeService: EmployeeService){}

  @Input() orderId = "";

  orders : any = [];
  type = "";
  noOrders = "false";

  ngOnInit(): void {
    let type;
    let email;
    this.authService.currentData.subscribe(dataSub => {
      type = dataSub.type;
      email = dataSub.email;
      this.type = dataSub.type;

      if((type != null || type != undefined) && type == "customer"){
        this.orderService.getOrders({email: email}).subscribe((result : any)=> {     
          this.orders = result;
          if(this.orders.length == 0){
            this.noOrders = "true";
          } 
        })
      }
      else{
        this.orderService.getAllOrders({email: email}).subscribe((result : any)=> {           
          this.orders = result;
          if(this.orders.length == 0){
            this.noOrders = "true";
          } 
        })
      }
    })    
  }

}
