import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Order } from 'src/app/interfaces/order';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { OrderService } from 'src/app/services/order/order.service';
import { UploadService } from 'src/app/services/upload/upload.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent {

  constructor(private uploadService: UploadService, private orderService: OrderService, private authService: AuthService, private customerService : CustomerService){
    this.authService.currentData.subscribe(dataSub => {
      this.orderForm.customer_email = dataSub.email;
      if(dataSub.email == null || dataSub.email == undefined){
        // this.customerService.getCustomerId({email : dataSub.email}).subscribe((result : any) => {
        //   this.user = result;
        //   console.log(result)
        //   return
        // })
        return
      }
      if(dataSub.email != null || dataSub.email != undefined){
        this.customerService.getCustomerId({email : dataSub.email}).subscribe((result : any) => {
          this.orderForm.customer_name = result.first_name;
          this.orderForm.customer_phone = result.mobile_no;
          return
        })
      }
    })
  }

  @ViewChild("takeInput", {static: false})
   
  // this InputVar is a reference to our input.
 
  inputSelected: ElementRef | any;

  image: any = [];
  originalImage: any = [];
  path = "";
  fileInput = false;
  backendUrl = "http://localhost:5500/"
  TempUrl = "";
  ImageUrl = "";

  postSuccess = false;
  postSuccessMessage = "";
  postError = false;
  postErrorMessage = "";
  close = "";


  orginalOrderForm : Order = {
    id: "",
    customer_email: "",
    customer_name: "",
    customer_phone: "",
    payment_type: "cash",
    url: "",
    total: "",
    date: "",
    order_desciption: "",
    status: "pending",
    rejected_reasons: "",
    products: []
  }

  orderForm : Order = {...this.orginalOrderForm}


  placeOrder(form : NgForm){
    if(this.TempUrl === ""){
      this.onHttpError("Please upload a prescription!")
      return
    }
    if(form.valid) {
      this.messages();
      let date;
      date = new Date
      let month = date.getUTCMonth() + 1; //months from 1-12
      let day = date.getUTCDate();
      let year = date.getUTCFullYear();
      this.orderForm.date = (day+"/"+month+"/"+year).toString();
      this.orderForm.url = this.TempUrl;
      this.orderService.createOrder(this.orderForm).subscribe((result : any) => {
        console.log(result)
        if(Object.hasOwn(result,'Error')){
          const status = Object.getOwnPropertyDescriptor(result, 'Status');
          const error = Object.getOwnPropertyDescriptor(result, 'Error');

          if(status?.value == "400") {
            this.onHttpError(error?.value)
          }
          else {
            this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!");
            console.log(error)
          }
        }
        else {
          this.messages()
          this.postSuccess = true;
          this.postSuccessMessage = "Order Placed Successfully!";
          this.TempUrl = "";
          this.ImageUrl = "";
          this.inputSelected.nativeElement.value = "";
        }
      });
    }
    else{
      this.onHttpError("Please fill all the fields!")
    }
  }




  changePrescription(fileInput: any) {
    this.fileInput=true
    this.messages();
    this.image = fileInput.target.files;

    if(this.image[0] == undefined) {
      return
    }

    if(this.image[0] != undefined ) {
      const formData: any = new FormData();
      formData.append('url',this.image[0])
      try{
          this.uploadService.postFiles(formData).subscribe((result: any) => {
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
            else{
              console.log(result.path)
              const afterLastSlash = result.path;
              console.log(afterLastSlash);
              this.TempUrl = afterLastSlash;
              this.ImageUrl = this.backendUrl+afterLastSlash;
              console.log(this.ImageUrl)
            }
        })
      }
      catch(e) {
        console.log(e);
      }
    }
  }

  closeWindow(cls : string){
    this.postError = false;
    this.postSuccess = false;
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
}
