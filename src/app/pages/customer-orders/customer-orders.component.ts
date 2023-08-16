import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent {

  constructor(){}

  component= "all";
  searchedOrderId : string = "";

  showAll(){
    this.component  = "all";
    // box.classList.add('bg-yellow', 'second-class', 'third-class');

    // ✅ Remove class
  // box.classList.remove('bg-yellow');
  }

  showPending(){
    this.component  = "pending";
    // box.classList.add('bg-yellow', 'second-class', 'third-class');

    // ✅ Remove class
  // box.classList.remove('bg-yellow');
  }

}
