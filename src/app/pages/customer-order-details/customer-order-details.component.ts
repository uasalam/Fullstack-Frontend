import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-customer-order-details',
  templateUrl: './customer-order-details.component.html',
  styleUrls: ['./customer-order-details.component.css']
})
export class CustomerOrderDetailsComponent implements OnInit {

  constructor(private location: Location,  private activatedRoute : ActivatedRoute , private customerService: CustomerService , private orderService: OrderService){}

  orginalOrder: Order = {
    id: "",
    customer_email: "",
    customer_name: "",
    customer_phone: "",
    payment_type: "",
    url: "",
    total: "",
    date: "" ,
    order_desciption: "",
    status: "",
    rejected_reasons: "",
    products: [{
      id: "",
      item_name: "",
      brand: "",
      type: "",
      price: "",
      product_total: ""
    }]
  };

  order : Order = {...this.orginalOrder}

  customer: any = [];
  order_id : any = ""
  noEditStatus = false;


  ngOnInit(){
    let order_id;
    let customer_email;

    this.activatedRoute.params.subscribe(parameter => {
      this.order_id = parameter['id'];
      order_id = parameter['id']
    })

    this.orderService.getById({id: order_id}).subscribe(result => {
      console.log(result)
      if(result.status == 'completed' || result.status == 'rejected' || result.status == 'cancelled'){
        this.noEditStatus = true;
      }
      else {
        this.noEditStatus = false;
      }
      this.order = result;
      customer_email = result.customer_email;
      this.customerService.getCustomerId({ email : customer_email}).subscribe(customer => {
        this.customer = customer;
      })
    })
  }



  back(){
    this.location.back()
  }

}
