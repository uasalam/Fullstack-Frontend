import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/interfaces/customer';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  postSuccess = false;
  postSuccessMessage = "";
  postError = false;
  postErrorMessage = "";

  orginalUser: any = {
    email: "",
    type: "",
    old_password: "",
    new_password: "",
    retype_password: ""
  }

  user: any = {...this.orginalUser}

  loggedInUser: any = {};

  edit = false;

  closeWindow(cls : string){
    this.postError = false;
    this.postSuccess = false;
  }

  constructor(private authService: AuthService, private customerService: CustomerService, private employeeService:EmployeeService){}

  ngOnInit(): void {
    this.authService.currentData.subscribe(dataSub => {
      this.loggedInUser = dataSub;
      this.user.type = dataSub.type;
      this.user.email = dataSub.email;
    })
  }


  saveNewPassword(form : NgForm){
    if(form.valid) {
      this.messages();
      if(this.user.new_password != this.user.retype_password){
        this.onHttpError("Please enter the same new password for both fields!")
        return;
      }
      if(this.loggedInUser.type === "customer"){
        this.customerService.updatePassword(this.user).subscribe((result : any) => {
          if(Object.hasOwn(result,'Error')){
            const status = Object.getOwnPropertyDescriptor(result, 'Status');
            const error = Object.getOwnPropertyDescriptor(result, 'Error');

            if(status?.value == "400") {
              this.onHttpError(error?.value)
            }
            else {
              this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!");
              console.log(result)
            }
          }
          else {
            this.postError = false;
            this.postSuccess = true;
            this.postSuccessMessage = "Password Updated Successfully!";
            this.edit = false;
            this.user = this.orginalUser;
          }
        });
      }
      else{
        this.employeeService.updatePassword(this.user).subscribe((result : any) => {
          if(Object.hasOwn(result,'Error')){
            const status = Object.getOwnPropertyDescriptor(result, 'Status');
            const error = Object.getOwnPropertyDescriptor(result, 'Error');
            if(status?.value == "400") {
              this.onHttpError(error?.value)
            }
            else {
              this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!");
              console.log(result)
            }
          }
          else {
            console.log(result)
            this.postError = false;
            this.postSuccess = true;
            this.postSuccessMessage = "Password Updated Successfully!";
            this.edit = false;
            this.user = this.orginalUser;
          }
        });
      }  
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

  toggleEdit(){
    this.edit = !this.edit;
  }


}
