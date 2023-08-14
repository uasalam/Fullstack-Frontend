import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(){}

  detail = document.getElementById('detail');
  security = document.getElementById('security');

  showDetail = true;
  component= "detail";

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

}
