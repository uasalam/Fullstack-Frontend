import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket/socket.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-component',
  templateUrl: './room-component.component.html',
  styleUrls: ['./room-component.component.css']
})
export class RoomComponentComponent implements OnInit {
  user: any ;
  Type: string | null = '';
  chatTrue:boolean = false;

  constructor(private router: Router, private authService: AuthService, private socketService: SocketService){}

  keys: any[] = [];
  rooms: any[] = [];
  newRoom: string = '';

  ngOnInit(): void {
    this.socketService.getRooms().subscribe((result: any) => {
      this.keys = Object.keys(result.rooms)
      this.rooms = result.rooms;
    })

    this.authService.currentData.subscribe(dataSub => {
      let user = dataSub;
      this.user = dataSub;
      if(user != null && user.type == 'customer'){
        this.Type = user.type;
        this.newRoom = user.email;
      }
      if(user != null && (user.type == 'staff' || user.type == 'admin' || user.type == 'user') ){
        this.Type = "staff";
        this.newRoom = user.email;
      }
    })
  }

  body: any = {
    room: ''
  }

  startChat(){
    this.body.room = this.newRoom
    this.socketService.newRoom(this.body.room).subscribe((room) => {
      console.log(room);
    })
    this.chatTrue = true;
  }

  chatNow(){
    this.router.navigate(['/room/'+this.newRoom]);
  }
}
