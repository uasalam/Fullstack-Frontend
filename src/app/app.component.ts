import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fullstack-Frontend';
  isShowDiv: boolean = false;

  constructor(private authService:AuthService){}

  clickEvent(){
    this.isShowDiv = !this.isShowDiv;
  }

  logout(){
    this.authService.logOut().subscribe((result)=>{
      console.log(result)
      console.log(this.authService.currentData)
    })
  }
}
