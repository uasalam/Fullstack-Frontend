import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-customer-order-details',
  templateUrl: './customer-order-details.component.html',
  styleUrls: ['./customer-order-details.component.css']
})

export class CustomerOrderDetailsComponent implements OnInit {

  constructor(private router: Router,  private activatedRoute : ActivatedRoute , private customerService: CustomerService , private orderService: OrderService, private authService: AuthService){}

  postSuccess = false;
  postSuccessMessage = "";
  postError = false;
  postErrorMessage = "";
  close = "";
  @Input() orderDetail = "detail";


  orginalOrder: any = {
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
    products: []
  };

  order : any = {...this.orginalOrder}

  customer: any = [];
  order_id : any = ""
  EditStatus = false;
  editItem = false;
  add = false;
  reason_reject = "";
  reject = false;
  userType = "";


  ngOnInit(){
    let order_id;
    let customer_email;

    this.activatedRoute.params.subscribe(parameter => {
      this.order_id = parameter['id'];
      order_id = parameter['id']
    })

    this.authService.currentData.subscribe(dataSub=>{
      this.userType = dataSub.type;
    })

    this.orderService.getById({id: order_id}).subscribe(result => {
      if(result.status == 'pending' || result.status == 'accepted'){
        this.EditStatus = false;
        this.reject = true;
      }
      this.order = result;
      customer_email = result.customer_email;
      this.customerService.getCustomerId({ email : customer_email}).subscribe(customer => {
        this.customer = customer;
      })
    })
  }

  orginalAddForm: any = {
    id: "",
    item_name: "",
    brand: "",
    product_total: ""
  }

  addForm: any = {...this.orginalAddForm}

  orginalEditForm: any = {
    id: "",
    item_name: "GG",
    brand: "",
    product_total: ""
  }

  editForm: any = {...this.orginalEditForm}


  addItem(){
    if(this.addForm.item_name == "" || this.addForm.product_total == "" || this.addForm.brand == ""){
      this.onHttpError('Please fill all the fields for the new item!')
      return
    }
    if(this.order.products.length == 0){
      this.addForm.id = "1";
      this.order.products.push(this.addForm)
      this.order.total = this.addForm.product_total;
    }
    else{
      this.addForm.id = (this.order.products.length + 1).toString;
      this.order.products.push(this.addForm)
      let tot = Number(this.order.total) + Number(this.addForm.product_total);
      this.order.total = (tot).toString();
    }

    this.orderService.updateOrder(this.order).subscribe((result : any) => {
      if(Object.hasOwn(result,'Error')){
        const status = Object.getOwnPropertyDescriptor(result, 'Status');
        const error = Object.getOwnPropertyDescriptor(result, 'Error');

        if(status?.value == "400") {
          this.onHttpError(error?.value)
        }
        else {
          this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!");
        }
      }
      else {
        if(result.message == "success"){
          this.postSuccess = true;
          this.postSuccessMessage = "Order updated Successfully!"
          this.add = !this.add;
          this.addForm = this.orginalAddForm;
        }
        else{
          this.onHttpError("Something went wrong try again Later!")
          this.add = !this.add;
          this.addForm = this.orginalAddForm;
        }        
      }
    })
  }

  editExisting(id : string){
    this.editItem = true;
    for (let i = 0; i < this.order.products.length; i++) {
      if(this.order.products[i].id == id){
        this.editForm = this.order.products[i];
      }
    }
    if(this.editForm.item_name == "" || this.editForm.product_total == "" || this.editForm.brand == ""){
      this.onHttpError('Please fill all the fields for the edit item!')
      return
    }
  }


  editUpdate(id : any){
    if(this.editForm.item_name == "" || this.editForm.product_total == "" || this.editForm.brand == ""){
      this.onHttpError('Please fill all the fields for the edit item!')
      return
    }
    let tot = 0;
    for (let i = 0; i < this.order.products.length; i++) {
      if(this.order.products[i].id == id){
        this.order.products[i] = this.editForm;
      }
      tot = tot + Number(this.order.products[i].product_total);
    }
    this.order.total = tot;

    this.orderService.updateOrder(this.order).subscribe((result : any) => {
      if(Object.hasOwn(result,'Error')){
        const status = Object.getOwnPropertyDescriptor(result, 'Status');
        const error = Object.getOwnPropertyDescriptor(result, 'Error');

        if(status?.value == "400") {
          this.onHttpError(error?.value)
        }
        else {
          this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!");
        }
      }
      else {
        if(result.message == "success"){
          this.postSuccess = true;
          this.postSuccessMessage = "Order updated Successfully!"
          this.editItem = !this.editForm;
          this.EditStatus = !this.EditStatus;
          this.editForm = this.orginalEditForm;
        }
        else{
          this.onHttpError("Something went wrong try again Later!")
          this.editItem = !this.editForm;
          this.EditStatus = !this.EditStatus;
          this.editForm = this.orginalEditForm;
        }        
      }
    })
  }


  deleteItem(id : any){
    let order = this.order
    let total = Number(order.total);
    for(let i = 0; i< order.products.length; i++){
      if(order.products[i].id == id){
        total = total - Number(order.products[i].product_total)
        order.products.splice(i, 1);
      }
      order.total = total.toString();
    }

    this.orderService.updateOrder(order).subscribe((result : any) => {
      if(Object.hasOwn(result,'Error')){
        const status = Object.getOwnPropertyDescriptor(result, 'Status');
        const error = Object.getOwnPropertyDescriptor(result, 'Error');

        if(status?.value == "400") {
          this.onHttpError(error?.value)
        }
        else {
          this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!");
        }
      }
      else {
        if(result.message == "success"){
          this.postSuccess = true;
          this.postSuccessMessage = "Order updated Successfully!"
          this.editItem = !this.editForm;
          this.EditStatus = !this.EditStatus;
          this.editForm = this.orginalEditForm;
        }
        else{
          this.onHttpError("Something went wrong try again Later!")
          this.editItem = !this.editForm;
          this.EditStatus = !this.EditStatus;
          this.editForm = this.orginalEditForm;
        }        
      }
    })
  }


  acceptStatus(){
    this.messages();
    this.orderService.updateStatus({id: this.order_id , status : "accepted"}).subscribe(order => {
      if(Object.hasOwn(order,'Error')){
        const status = Object.getOwnPropertyDescriptor(order, 'Status');
        const error = Object.getOwnPropertyDescriptor(order, 'Error');

        if(status?.value == "400") {
          this.onHttpError(error?.value)
        }
        else {
          this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!");
        }
      }
      else {
        if(order.message == "success"){
          this.postSuccess = true;
          this.postSuccessMessage = "Order updated Successfully!"
          this.order.status = "accepted";
        }
        else{
          this.onHttpError("Something went wrong try again Later!")
        }
        
      }
    })
  }


  completeStatus(){
    this.messages();
    this.orderService.updateStatus({id: this.order_id , status : "completed"}).subscribe(order => {
      if(Object.hasOwn(order,'Error')){
        const status = Object.getOwnPropertyDescriptor(order, 'Status');
        const error = Object.getOwnPropertyDescriptor(order, 'Error');

        if(status?.value == "400") {
          this.onHttpError(error?.value)
        }
        else {
          this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!");
        }
      }
      else {
        if(order.message == "success"){
          this.postSuccess = true;
          this.postSuccessMessage = "Order updated Successfully!"
          this.order.status = "completed";
          this.reject = false;
        }
        else{
          this.onHttpError("Something went wrong try again Later!")
        }
        
      }
    })
  }



  rejectStatus(){
    this.messages();
    if(this.reason_reject == ""){
      this.onHttpError("Please Select a Reason for Rejection or Cancellation")
      return;
    }
    let status = "rejected";
    this.orderService.updateRejectStatus({id: this.order_id , status : status, rejected_reasons : this.reason_reject}).subscribe(order => {
      if(Object.hasOwn(order,'Error')){
        const status = Object.getOwnPropertyDescriptor(order, 'Status');
        const error = Object.getOwnPropertyDescriptor(order, 'Error');

        if(status?.value == "400") {
          this.onHttpError(error?.value)
        }
        else {
          this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!");
        }
      }
      else {
        if(order.message == "success"){
          this.postSuccess = true;
          this.postSuccessMessage = "Order updated Successfully!"
          this.order.status = "rejected";
          this.reject = false;
        }
        else{
          this.onHttpError("Something went wrong try again Later!")
        }
        
      }
    })
  }



  cancelStatus(){
    this.messages();
    if(this.reason_reject == ""){
      this.onHttpError("Please Select a Reason for Rejection or Cancellation")
      return;
    }
    let status = "cancelled";
    this.orderService.updateRejectStatus({id: this.order_id , status : status, rejected_reasons : this.reason_reject}).subscribe(order => {
      if(Object.hasOwn(order,'Error')){
        const status = Object.getOwnPropertyDescriptor(order, 'Status');
        const error = Object.getOwnPropertyDescriptor(order, 'Error');

        if(status?.value == "400") {
          this.onHttpError(error?.value)
        }
        else {
          this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!");
        }
      }
      else {
        if(order.message == "success"){
          this.postSuccess = true;
          this.postSuccessMessage = "Order updated Successfully!"
          this.order.status = "cancelled";
          this.reject = false;
        }
        else{
          this.onHttpError("Something went wrong try again Later!")
        }
        
      }
    })
  }


  editToggle(){
    this.EditStatus = !this.EditStatus;
  }

  editItemMethodFalse(){
    if(this.editForm.item_name == "" || this.editForm.product_total == "" || this.editForm.brand == ""){
      this.onHttpError('Please fill all the fields for the edit item!')
      return
    }
    this.editItem = false;
    this.EditStatus = false;
  }

  addItemToggle(){
    this.add = !this.add;
  }


  back(){
    this.router.navigateByUrl('/customer/orders')
  }

  messages(): void{
    this.postSuccess = false;
    this.postError = false;
  }

  onHttpError(errorResponse:  any): void {
    console.log('error : ',errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse;
    console.log(this.postErrorMessage)
  }

  closeWindow(cls : string){
    this.postError = false;
    this.postSuccess = false;
  }

}
