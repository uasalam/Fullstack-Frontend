import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: Socket;
  readonly url: string = 'http://localhost:5500';


  constructor(private http: HttpClient) {
    this.socket = io(this.url);
  }

  listen(eventName: string) : Observable<any> {
    return new Observable((subscribe) => {
      this.socket.on(eventName, (data) => {
        subscribe.next(data);
      })
    })
  }

  emit(eventName: string, room: any, data: any){
    this.socket.emit(eventName, room, data);
  }

  delete(eventName: any, room: any){
    this.socket.emit(eventName, room);
  }

  newRoom(body: any){
    console.log(body)
    return this.http.post(this.url+'/room', body);
  }

  getRooms() : any{
    return this.http.get(this.url+'/get');
  }
}