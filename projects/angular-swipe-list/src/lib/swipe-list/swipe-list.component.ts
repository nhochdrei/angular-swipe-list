import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { defaultOptions } from '../swipe-cell/swipe-cell.component';
import { SwipelistData } from '../swipelist-types';

@Component({
  selector: 'n3-swipe-list',
  templateUrl: './swipe-list.component.html',
  styleUrls: ['./swipe-list.component.scss']
})
export class SwipeListComponent implements OnInit {

  @Input() options = Object.assign({}, defaultOptions);
  @Input() data: SwipelistData[];

  @Output() dataChange = new EventEmitter<SwipelistData[]>();
  @Output() singleChangedData = new EventEmitter<SwipelistData>();
  @Output() touch = new EventEmitter<SwipelistData>();

  constructor() { }

  ngOnInit(): void {
  }

  transmitMessage(event): void {
    this.singleChangedData.emit(event);
    this.dataChange.emit(this.data);
  }

  onTouchTriggered(event): void {
    this.touch.emit(event);
  }

}
