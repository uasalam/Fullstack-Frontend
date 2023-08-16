import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})
export class PendingOrdersComponent {
  constructor(private orderService: OrderService, private authService: AuthService){}

  pendingArray : any = [];
  @Input() orderId = "";

  ngOnInit(): void {
    let type;
    let email;
    this.authService.currentData.subscribe(dataSub => {
      type = dataSub.type;
      email = dataSub.email;

      if((type != null || type != undefined) && type == "customer"){
        this.orderService.getOrders({email: email}).subscribe((result : any)=> {
          let allOrders : any = [];
          allOrders = result;
          for(let i = 0; i < allOrders.length; i++) {
            if(allOrders[i].status === 'pending'){
              this.pendingArray.push(allOrders[i]);
            }
          }
        })
      }
    })    
  }
}
