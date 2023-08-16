import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { UploadService } from 'src/app/services/upload/upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private customerService : CustomerService, private employeeService : EmployeeService, private uploadService: UploadService){}

  detail = document.getElementById('detail');
  security = document.getElementById('security');

  showDetail = true;
  component= "detail";
  user:any = "";

  image: any = [];
  path = "";
  postSuccess = false;
  postSuccessMessage = "";
  postError = false;
  postErrorMessage = "";
  close = "";


  ngOnInit(): void {
    this.authService.currentData.subscribe(data=>{
      if(data.type == 'customer'){
        this.customerService.getCustomerId({email : data.email}).subscribe(customer => {
          this.user = customer;
        })
      }
      else{
        this.employeeService.getEmployeeId({email : data.email}).subscribe(employee => {
          this.user = employee;
        })
      }
    })
  }

  selectImage(fileInput: any) {
    this.messages();
    this.image = fileInput.target.files;

    if(this.image[0] == undefined) {
      return
    }

    if(this.image[0] != undefined) {
      const formData: any = new FormData();
      formData.append('url',this.image[0])
      try{
          this.uploadService.postFiles(formData).subscribe((result: any) => {
          this.path = result.path;
          if(this.user.type == "customer"){
            this.customerService.updatePicture({email : this.user.email, url : this.path}).subscribe(async(pic:any) => {
              this.user.url = await pic.url;
              if(pic.url != undefined && pic.url != null && pic.url != ""){
                this.postSuccessMessage = "Profile Picture Updated Successfully!"
                this.postSuccess = true;
              }
              else {
                this.messages();
                this.onHttpError("Profile Picture Could not be Updated. Try Again Later!")
              }
            })
          }
          else{
            this.employeeService.updatePicture({email : this.user.email, url : this.path}).subscribe(async(pic:any) => {
              this.user.url = await pic.url;
              if(pic.url != undefined && pic.url != null && pic.url != ""){
                this.postSuccessMessage = "Profile Picture Updated Successfully!"
                this.postSuccess = true;
              }
              else {
                this.messages();
                this.onHttpError("Profile Picture Could not be Updated. Try Again Later!")
              }
            })
          }         
        })
      }
      catch(e) {
        console.log(e);
      }
    }
  }

  

  toggleWindow(){
    this.showDetail = !this.showDetail;

    if(this.component === "detail"){
      this.component = "security";
    }
    else {
      this.component = "detail";
    }
    // box.classList.add('bg-yellow', 'second-class', 'third-class');

    // ✅ Remove class
  // box.classList.remove('bg-yellow');
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
