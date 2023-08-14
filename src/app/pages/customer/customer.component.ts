import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  constructor(private customerService : CustomerService){}

  postSuccess = false;
  postSuccessMessage = "";
  postError = false;
  postErrorMessage = "";
  close = "";

  find = false;

  orginalCustomerForm : Customer = {
    first_name: "",
    last_name: "",
    nic: "",
    dob: "",
    email: "",
    mobile_no: "",
    address: "",
    access: "",
    type:"customer",
    url: "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/profile+pic.jpg",
    password: ""
  }

  confirmPassword = "";

  customerForm : Customer = {...this.orginalCustomerForm};

  closeWindow(cls : string){
    this.postError = false;
    this.postSuccess = false;
  }


  createCustomer(form:NgForm){
    if(form.valid) {
      this.messages();
      if(this.customerForm.password != this.confirmPassword){
        this.onHttpError("Please enter the same password for both fields!")
        return;
      }
      this.customerService.registerCustomerForm(this.customerForm).subscribe((result : any) => {
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
          this.messages()
          this.find = false;
          this.postError = false;
          this.postSuccess = true;
          this.postSuccessMessage = "Customer Registration Successful!";
          this.customerForm = this.orginalCustomerForm;
          this.confirmPassword = "";
        }
      });
    }
    else{
      this.onHttpError("Please fill all the fields!")
    }
  }




  orginalBody : any = {
    email: ''
  }

  body : any = {...this.orginalBody}

  onFind(search: NgForm){
    if(search.valid){
      this.messages();

      this.customerService.getCustomerId(this.body).subscribe((result : any) => {
        if(result == null) {
          this.onHttpError("Customer not Found!")
        }
        else{
          this.messages();
          this.find = true;          
          this.customerForm = result;
          this.postSuccess = true;
          this.postSuccessMessage = "Customer "+result.first_name+" Found!";
        }
      })
    }
  }


  updateCustomer(form: NgForm){
    if(form.valid){
      this.messages();
      this.customerService.updateCustomer(this.customerForm).subscribe((result) => {
        if (Object.hasOwn(result, 'Error')) {
          const status = Object.getOwnPropertyDescriptor(result, 'Status');
          const error = Object.getOwnPropertyDescriptor(result, 'Error');

          if (status?.value == "400") {
            this.onHttpError(error?.value);
          }
          else {
            this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!");
          }
        }
        else {
          this.messages();
          this.find = false;
          this.postSuccess = true;
          this.postSuccessMessage = "Customer "+this.customerForm.first_name + " Updated Successfully!";
          this.customerForm = {...this.orginalCustomerForm}
          this.body = {...this.orginalBody}
        }
      });
    }
  }

  deleteCustomer(form: NgForm){
    if(form.valid){
      this.messages();
      this.customerService.deleteCustomer(this.customerForm).subscribe((result : any) => {
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
          this.messages();
          this.find = false;
          this.postSuccess = true;
          this.postSuccessMessage = "Customer "+ this.customerForm.first_name + " - Deleted Successfully!"
          this.customerForm = {...this.orginalCustomerForm}
          this.body = {...this.orginalBody}
        }
      });
    }
  }

  cancel():void {
    this.customerForm = {...this.orginalCustomerForm}
    this.messages();
    this.find = false;
    this.body = {...this.orginalBody}
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
