import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { StandardvaluesService } from '../standardvalues.service';
import { SwipelistData, SwipelistOptions, SwipelistState } from '../swipelist-types';

@Component({
  selector: 'app-swipe-cell',
  templateUrl: './swipe-cell.component.html',
  styleUrls: ['./swipe-cell.component.scss'],
  animations: [
    trigger('touchEnd', [
      state('initial', style({
        left: 0,
      })),
      state('swiped', style({
      })),
      transition('swiped => initial', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class SwipeCellComponent implements OnInit {

  @Input() options: SwipelistOptions;
  @Input() data: SwipelistData;

  leftState: SwipelistState = {
    value: '',
    label: 'links',
    color: 'rgba(0, 0, 0, 0)'
  };
  rightState: SwipelistState = {
    value: '',
    label: 'rechts',
    color: 'rgba(0, 0, 0, 0)'
  };

  @Output() dataChange = new EventEmitter();

  @ViewChild('leftDiv') leftElement: ElementRef;
  @ViewChild('cell') elementToMove: ElementRef;
  @ViewChild('rightDiv') rightElement: ElementRef;

  leftswipeDetectvalue = -150;
  rightswipeDetectvalue = 150;

  linearGradientString: string;

  private firstX: number;
  private relativeX: number;
  private localSavedInnerWidth: number;
  swiped = false;

  swipedLeft = false;
  swipedRight = false;
  activeState = {
    index: 0,
    label: ''
  };

  constructor(
    private renderer: Renderer2,
    private standardvalueService: StandardvaluesService) {
  }

  ngOnInit(): void {
    this.options = this.standardvalueService
      .getStandardOptionValues(this.options);

    this.data = this.standardvalueService
      .getStandardDataValues(this.data);

    this.setGradient();
    this.setDefaultActiveState();
    this.setLeftAndRightStates();
  }

  private setGradient(): void {
    this.linearGradientString = 'linear-gradient(90deg,' +
      this.leftState.color + ',' + this.rightState.color + ')';
  }

  private setDefaultActiveState(): void {
    this.activeState.index = this.data.defaultStartIndex;
    this.activeState.label = this.options.states[this.data.defaultStartIndex].value;
    this.data.value = this.options.states[this.data.defaultStartIndex].value;
  }

  private setLeftAndRightStates(): void {
    if ((this.activeState.index - 1) >= 0) {
      this.rightState = this.options
        .states[this.activeState.index - 1];
    } else {
      this.rightState = this.options
        .states[this.activeState.index];
    }

    if ((this.activeState.index + 1)
      < this.options.states.length) {
      this.leftState = this.options
        .states[this.activeState.index + 1];

    } else {
      this.leftState = this.options
        .states[this.options.states.length - 1];
    }
  }

  private onSwipe(): void {
    this.setLeftAndRightStates();
    this.setGradient();
  }

  private afterSwipeLeft(): void {
    this.dataChange.emit(this.data);

    if ((this.activeState.index - 1) >= 0) {
      this.activeState.index--;

      this.activeState.label =
        this.options.states[this.activeState.index].value;
      this.data.value =
        this.options.states[this.activeState.index].value;
    }
  }

  private afterSwipeRight(): void {
    this.dataChange.emit(this.data);

    if ((this.activeState.index + 1)
      < this.options.states.length) {
      this.activeState.index++;

      this.activeState.label =
        this.options.states[this.activeState.index].value;
      this.data.value =
        this.options.states[this.activeState.index].value;
    }
  }

  private afterSwiped(): void {
    if (this.relativeX <= this.leftswipeDetectvalue) {
      this.afterSwipeLeft();
    } else if (this.relativeX >= this.rightswipeDetectvalue) {
      this.afterSwipeRight();
    }
  }

  @HostListener('touchstart') onTouchStart() {
    this.localSavedInnerWidth = window.innerWidth;
    this.swiped = true;

    this.onSwipe();
  }

  @HostListener('touchmove', ['$event']) onTouchMove(event: TouchEvent) {

    if (this.firstX === undefined) {
      this.firstX = event.touches[0].screenX;
    }

    const actualX = event.touches[0].screenX;
    this.relativeX = (this.firstX - actualX) * -1;

    if (this.relativeX > 0) {
      if (this.relativeX < this.localSavedInnerWidth) {
        this.positionElement();
      }
    } else {
      if (this.relativeX > (this.localSavedInnerWidth * -1)) {
        this.positionElement();
      }
    }

  }

  @HostListener('touchend') onTouchEnd() {
    this.firstX = undefined;
    this.swiped = false;
    this.afterSwiped();
  }

  private positionElement(): void {
    const relativeXpx = this.relativeX.toString() + 'px';
    const width = this.elementToMove.nativeElement.offsetWidth;

    if (this.relativeX <= width && this.relativeX >= (width * -1)) {
      this.renderer.setStyle(this.elementToMove.nativeElement, 'position', 'relative');
      this.renderer.setStyle(this.elementToMove.nativeElement, 'left', relativeXpx);
    }
  }
}
