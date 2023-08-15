import { Component, Input } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent {

  constructor(private orderService: OrderService, private authService: AuthService){}

  @Input() orderId = "";

  orders : any = []; 

  ngOnInit(): void {
    let type;
    let email;
    this.authService.currentData.subscribe(dataSub => {
      type = dataSub.type;
      email = dataSub.email;

      if((type != null || type != undefined) && type == "customer"){
        this.orderService.getOrders({email: email}).subscribe((result : any)=> {
          console.log(result)
          this.orders = result;
        })
      }
    })    
  }

}
