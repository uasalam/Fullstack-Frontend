import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit{

  postErrorPicture = false;
  postErrorMessagePicture = "";
  postSuccessPicture = false;
  postSuccessMessagePicture = "";

  postSuccess = false;
  postSuccessMessage = "";
  postError = false;
  postErrorMessage = "";

  orginalUser: any = {
    first_name: "",
    last_name: "",
    nic: "",
    dob: "",
    email: "",
    mobile_no: "",
    address: "",
    access: "",
    type: "",
    url: "",
    password: ""
  }

  user: any = {...this.orginalUser}

  loggedInUser: any = {};

  edit = false;

  closeWindow(cls : string){
    this.postError = false;
    this.postSuccess = false;
  }

  constructor(private authService: AuthService, private customerService: CustomerService, private employeeService: EmployeeService){}

  ngOnInit(): void {
    this.authService.currentData.subscribe((dataSub : any) => {
      this.loggedInUser = dataSub;
      if(dataSub.email != null || dataSub.email != undefined && dataSub.type === "customer"){
        this.customerService.getCustomerId({email : dataSub.email}).subscribe((result : any) => {
          this.user = result;
          return
        })
      }
      if(dataSub.email != null || dataSub.email != undefined && (dataSub.type === "staff" || dataSub.type === "user" || dataSub.type === "admin")){
        this.employeeService.getEmployeeId({email : dataSub.email}).subscribe((result : any) => {
          this.user = result;
          return
        })
      }
    })
  }


  saveProfile(form : NgForm){
    if(form.valid) {
      this.messages();
      if(this.loggedInUser.type === "customer"){
        this.customerService.updateCustomer(this.user).subscribe((result : any) => {
          if(Object.hasOwn(result,'Error')){
            const status = Object.getOwnPropertyDescriptor(result, 'Status');
            const error = Object.getOwnPropertyDescriptor(result, 'Error');
  
            if(status?.value === "400") {
              this.onHttpError(error?.value)
            }
            else {
              this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!");
            }
          }
          else {
            this.postError = false;
            this.postSuccess = true;
            this.postSuccessMessage = "Profile Updated Successfully!";
            this.edit = false;
          }
        });
      }
      else{
        this.employeeService.updateEmployee(this.user).subscribe((result : any) => {
          if(Object.hasOwn(result,'Error')){
            const status = Object.getOwnPropertyDescriptor(result, 'Status');
            const error = Object.getOwnPropertyDescriptor(result, 'Error');
  
            if(status?.value === "400") {
              this.onHttpError(error?.value)
            }
            else {
              this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!");
            }
          }
          else {
            this.postError = false;
            this.postSuccess = true;
            this.postSuccessMessage = "Profile Updated Successfully!";
            this.edit = false;
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
  }

  toggleEdit(){
    this.edit = !this.edit;
  }

}
