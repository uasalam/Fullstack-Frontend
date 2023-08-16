import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private customerService : CustomerService){}

  postSuccess = false;
  postSuccessMessage = "";
  postError = false;
  postErrorMessage = "";
  close = "";

  orginalCustomerForm : Customer = {
    first_name: "",
    last_name: "",
    nic: "",
    dob: "",
    email: "",
    mobile_no: "",
    address: "",
    access: "open",
    type:"customer",
    url: "https://pharmacy-system.s3.ap-south-1.amazonaws.com/profile+pic.jpg",
    password: ""
  }

  confirmPassword: String = "";

  customerForm : Customer = {...this.orginalCustomerForm};

  closeWindow(cls : string){
    this.postError = false;
    this.postSuccess = false;
  }

  registerCustomer(form:NgForm){
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
          this.postError = false;
          this.postSuccess = true;
          this.postSuccessMessage = "Registration Successful!";
          this.customerForm = this.orginalCustomerForm;
        }
      });
    }
    else{
      this.onHttpError("Please fill all the fields!")
    }
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
