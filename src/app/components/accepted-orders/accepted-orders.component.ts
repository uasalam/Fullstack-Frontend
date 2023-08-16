import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-accepted-orders',
  templateUrl: './accepted-orders.component.html',
  styleUrls: ['./accepted-orders.component.css']
})
export class AcceptedOrdersComponent {

  constructor(private orderService: OrderService, private authService: AuthService){}

  
  @Input() orderId = "";

  acceptedArray : any = [];
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
            if(allOrders[i].status == 'accepted'){
              this.acceptedArray.push(allOrders[i]);
            }
          }
          if(this.acceptedArray.length == 0){
            this.noOrders = "true";
          } 
        })
      }
      else{
        this.orderService.getAllOrders({email: email}).subscribe((result : any)=> {
          let allOrders : any = [];
          allOrders = result;
          if(allOrders.length == 0){
            this.noOrders = "true";
          } 
          for(let i = 0; i < allOrders.length; i++) {
            if(allOrders[i].status == 'pending'){
              this.acceptedArray.push(allOrders[i]);
            }
          }
          if(this.acceptedArray.length == 0){
            this.noOrders = "true";
          } 
        })
      }
    })    
  }
}
