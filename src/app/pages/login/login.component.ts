import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginUser } from 'src/app/interfaces/login';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router){}

  originalLoginForm: LoginUser = {
    email: "",
    password: "",
    type: "customer"
  };

  toggleLogin(){
    if(this.loginForm.type === "customer"){
      this.loginForm.type = "staff";
    }
    else{
      this.loginForm.type = "customer";
    }
  }

  loginForm: LoginUser = {...this.originalLoginForm}

  postError = false;
  postErrorMessage = "";
  postSuccess = false;
  postSuccessMessage = "";
  close="";


  closeWindow(cls : string){
    this.postError = false;
    this.postSuccess = false;
  }


  onSubmit(form : NgForm) {
    console.log(this.authService.getUser());
    if(form.valid) {
      this.messages();
      this.authService.login(this.loginForm).subscribe((result : any) => {
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
          this.postSuccessMessage = "Login Successful!";
          this.loginForm = this.originalLoginForm;
          this.router.navigate(['/home']);
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
