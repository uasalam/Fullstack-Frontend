import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  
  @Input() error = "";

  @Output() Event = new EventEmitter<string>();

  EventClose() {
    this.Event.emit("close");
  }

}
