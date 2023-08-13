import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-order-details',
  templateUrl: './customer-order-details.component.html',
  styleUrls: ['./customer-order-details.component.css']
})
export class CustomerOrderDetailsComponent {

  constructor(private location: Location){}

  back(){
    this.location.back()
  }

}
