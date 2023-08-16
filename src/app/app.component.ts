import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Fullstack-Frontend';
  isShowDiv: boolean = false;
  isCustomer = false;
  isStaff = false;

  constructor(private authService:AuthService, private router: Router){}

  ngOnInit(): void {
    this.authService.currentData.subscribe(dataSub => {
      let user = dataSub;
      user = dataSub;
      if(user != null){
        if(user.type == "customer"){
          this.isCustomer = true;
          return
        }
        if(user.type == "admin" || user.type == "staff" || user.type == "user"){
          this.isStaff = true;
          return
        }
      }
    })
  }

  ngAfterViewInit(){
    this.authService.currentData.subscribe(dataSub => {
      let user = dataSub;
      user = dataSub;
      if(user != null){
        if(user.type == "customer"){
          this.isCustomer = true;
          return
        }
        if(user.type == "admin" || user.type == "staff" || user.type == "user"){
          this.isStaff = true;
          return
        }
      }
    })
  }

  clickEvent(){
    this.isShowDiv = !this.isShowDiv;
  }

  logout(){
    this.authService.logOut().subscribe((result)=>{
      this.isCustomer = false;
      this.isStaff = false;
      this.router.navigate(['/login']); 
    })
  }
}
