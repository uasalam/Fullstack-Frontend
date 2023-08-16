import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-rejected-orders',
  templateUrl: './rejected-orders.component.html',
  styleUrls: ['./rejected-orders.component.css']
})
export class RejectedOrdersComponent implements OnInit {


  constructor(private orderService: OrderService, private authService: AuthService){}

  
  @Input() orderId = "";

  rejectedArray : any = [];
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
          let allOrders : any = [];
          allOrders = result;
          for(let i = 0; i < allOrders.length; i++) {
            if(allOrders[i].status == 'rejected'){
              this.rejectedArray.push(allOrders[i]);
            }
          }
          if(this.rejectedArray.length == 0){
            this.noOrders = "true";
          } 
        })
      }
      else{
        this.orderService.getAllOrders({email: email}).subscribe((result : any)=> {
          let allOrders : any = [];
          allOrders = result;
          for(let i = 0; i < allOrders.length; i++) {
            if(allOrders[i].status == 'rejected'){
              this.rejectedArray.push(allOrders[i]);
            }
          }
          if(this.rejectedArray.length == 0){
            this.noOrders = "true";
          } 
        })
      }
    })    
  }
}
