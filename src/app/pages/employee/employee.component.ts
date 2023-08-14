import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  constructor(private employeeService : EmployeeService){}

  postSuccess = false;
  postSuccessMessage = "";
  postError = false;
  postErrorMessage = "";
  close = "";

  find = false;

  orginalEmployeeForm : Employee = {
    first_name: "",
    last_name: "",
    nic: "",
    dob: "",
    email: "",
    mobile_no: "",
    address: "",
    access: "",
    type:"staff",
    url: "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/profile+pic.jpg",
    password: ""
  }

  confirmPassword = "";

  employeeForm : Employee = {...this.orginalEmployeeForm};

  closeWindow(cls : string){
    this.postError = false;
    this.postSuccess = false;
  }


  createCustomer(form:NgForm){
    if(form.valid) {
      this.messages();
      if(this.employeeForm.password != this.confirmPassword){
        this.onHttpError("Please enter the same password for both fields!")
        return;
      }
      this.employeeService.postEmployeeForm(this.employeeForm).subscribe((result : any) => {
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
          this.postSuccessMessage = "Employee " +this.employeeForm.first_name+" Registered Successfully!";
          this.employeeForm = this.orginalEmployeeForm;
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

      this.employeeService.getEmployeeId(this.body).subscribe((result : any) => {
        if(result == null) {
          this.onHttpError("Employee not Found!")
        }
        else{
          this.messages();
          this.find = true;          
          this.employeeForm = result;
          this.postSuccess = true;
          this.postSuccessMessage = "Employee "+result.first_name+" Found!";
        }
      })
    }
  }


  updateCustomer(form: NgForm){
    if(form.valid){
      this.messages();
      this.employeeService.updateEmployee(this.employeeForm).subscribe((result:any) => {
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
          this.postSuccessMessage = "Employee "+this.employeeForm.first_name + " Updated Successfully!";
          this.employeeForm = {...this.orginalEmployeeForm}
          this.body = {...this.orginalBody}
        }
      });
    }
  }

  deleteCustomer(form: NgForm){
    if(form.valid){
      this.messages();
      this.employeeService.deleteEmployee(this.employeeForm).subscribe((result : any) => {
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
          this.postSuccessMessage = "Employee "+ this.employeeForm.first_name + " - Deleted Successfully!"
          this.employeeForm = {...this.orginalEmployeeForm}
          this.body = {...this.orginalBody}
        }
      });
    }
  }

  cancel():void {
    this.employeeForm = {...this.orginalEmployeeForm}
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
