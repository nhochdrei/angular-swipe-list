import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { SwipelistData, SwipelistOptions, SwipelistState } from '../swipelist-types';

export const defaultOptions: SwipelistOptions = {
  states: [{
    value: 'left',
    color: 'rgb(200, 200, 200)'
  },
  {
    value: 'right',
    color: 'rgb(200, 200, 200)'
  }],
  hasStates: true,
  height: '50px',
  colorCenter: 'rgb(256, 256, 256)',
  colorText: 'black',
  colorStatePanel: 'rgb(173, 173, 173)'
};

@Component({
  selector: 'n3-swipe-cell',
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

  private _options = Object.assign({}, defaultOptions);
  @Input()
  get options() { return this._options; }
  set options(options: SwipelistOptions) {
    Object.assign(this._options, defaultOptions, options);
  }

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

  @Output() dataChange = new EventEmitter<SwipelistData>();

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
    label: '',
    hasMatIcon: false,
    matIcon: '',
    hasCustomIcon: false,
    customIcon: ''
  };

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.setGradient();
    this.setDefaultActiveState();
    this.setLeftAndRightStates();
  }

  private setGradient(): void {
    this.linearGradientString = 'linear-gradient(90deg,' +
      this.leftState.color + ',' + this.rightState.color + ')';
  }

  private setDefaultActiveState(): void {
    this.activeState.index = this.data.defaultStartIndex || 0;
    this.activeState.label = this.data.value = this.options.states[this.activeState.index].value;

    if (this.options.states[this.activeState.index].matIcon !== undefined) { this.activeState.hasMatIcon = true; }
    this.activeState.matIcon = this.options.states[this.activeState.index].matIcon || '';
    if (this.options.states[this.activeState.index].customIcon !== undefined) { this.activeState.hasCustomIcon = true; }
    this.activeState.customIcon = this.options.states[this.activeState.index].customIcon || '';

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

  private updateLabelOnSwipe(): void {
    if (this.options.states[this.activeState.index].matIcon !== undefined) {
      this.activeState.hasMatIcon = true;
    } else {
      this.activeState.hasMatIcon = false;
    }

    if (this.options.states[this.activeState.index].customIcon !== undefined) {
      this.activeState.hasCustomIcon = true;
    } else {
      this.activeState.hasCustomIcon = false;
    }

    this.activeState.matIcon = this.options.states[this.activeState.index].matIcon || '';
    this.activeState.customIcon = this.options.states[this.activeState.index].customIcon || '';

    this.activeState.label =
      this.options.states[this.activeState.index].value;
    this.data.value =
      this.options.states[this.activeState.index].value;
  }

  private afterSwipeLeft(): void {
    this.dataChange.emit(this.data);

    if ((this.activeState.index - 1) >= 0) {
      this.activeState.index--;
      this.updateLabelOnSwipe();
    }
  }

  private afterSwipeRight(): void {
    this.dataChange.emit(this.data);

    if ((this.activeState.index + 1)
      < this.options.states.length) {
      this.activeState.index++;
      this.updateLabelOnSwipe();
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
    this.relativeX = 0;
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
