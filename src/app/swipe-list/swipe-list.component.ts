import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SwipelistData, SwipelistOptions } from 'src/app/swipelist-types';

@Component({
  selector: 'app-swipe-list',
  templateUrl: './swipe-list.component.html',
  styleUrls: ['./swipe-list.component.scss']
})
export class SwipeListComponent implements OnInit {

  @Input() options: SwipelistOptions;
  @Input() data: SwipelistData;

  @Output() dataChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    if (this.options === undefined) {
      this.options = {
        colorText: 'black'
      };
    }
  }

  transmitMessage(event): void {
    this.dataChange.emit(this.data);
  }

}
