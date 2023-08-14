import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {

  @Input() success = "";

  @Output() Event = new EventEmitter<string>();

  EventClose() {
    this.Event.emit("close");
  }


}
