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

  constructor() { }

  ngOnInit(): void {
  }

  transmitMessage(event): void {
    this.dataChange.emit(this.data);
  }

}
