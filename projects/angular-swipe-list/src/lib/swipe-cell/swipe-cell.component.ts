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
  statesAtLeft: false,
  stateFontSize: '12pt',
  displayStateValue: true,
  height: '50px',
  listFontsize: '12pt',
  colorCenter: 'rgb(256, 256, 256)',
  colorText: 'black',
  colorStatePanel: 'rgb(173, 173, 173)',
  minSwipePercent: 20
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
  @Output() touch = new EventEmitter<SwipelistData>();

  @ViewChild('leftDiv') leftElement: ElementRef;
  @ViewChild('cell') elementToMove: ElementRef;
  @ViewChild('rightDiv') rightElement: ElementRef;

  linearGradientString: string;

  private actualScreenWidth: number;
  private firstX: number;
  private relativeX: number;
  private firstY: number;
  private relativeY: number;
  private localSavedInnerWidth: number;

  deadSpace = 5;
  canSwipe = false;
  swiping = false;

  swipedLeft = false;
  swipedRight = false;
  activeState = {
    index: 0,
    label: '',
    color: 'rgb(0, 0, 0)',
    hasMatIcon: false,
    matIcon: '',
    matIconStyling: '',
    hasCustomIcon: false,
    customIcon: ''
  };

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.setGradient();
    this.setDefaultActiveState();
    this.setLeftAndRightStates();
    this.setActiveScreenWidth();
  }

  private setGradient(): void {
    this.linearGradientString = 'linear-gradient(90deg,' +
      this.leftState.color + ',' + this.rightState.color + ')';
  }

  private setDefaultActiveState(): void {
    this.activeState.index = this.data.defaultStartIndex || 0;
    const statesTmp = this.options.states[this.activeState.index];

    this.activeState.label = this.data.value = statesTmp.value;
    if (statesTmp.color && this.options.useColorOfStates) {
      this.activeState.color = this.options.colorStatePanel = statesTmp.color;
    }

    if (statesTmp.matIcon !== undefined) {
      this.activeState.hasMatIcon = true;
    }
    this.activeState.matIcon = statesTmp.matIcon || '';
    this.activeState.matIconStyling = statesTmp.matIconStyling || '';

    if (statesTmp.customIcon !== undefined) {
      this.activeState.hasCustomIcon = true;
    }
    this.activeState.customIcon = statesTmp.customIcon || '';
  }

  private setLeftAndRightStates(): void {
    if (this.activeState.index - 1 >= 0) {
      this.rightState = this.options.states[this.activeState.index - 1];
    } else {
      this.rightState = this.options.states[this.activeState.index];
    }

    if (this.activeState.index + 1 < this.options.states.length) {
      this.leftState = this.options.states[this.activeState.index + 1];
    } else {
      this.leftState = this.options.states[this.options.states.length - 1];
    }
  }

  private setActiveScreenWidth(): void {
    this.actualScreenWidth = window.innerWidth;
  }

  private onSwipe(): void {
    this.setLeftAndRightStates();
    this.setGradient();
  }

  private updateLabelOnSwipe(): void {
    const statesTmp = this.options.states[this.activeState.index];

    if (statesTmp.matIcon) {
      this.activeState.hasMatIcon = true;
      this.activeState.matIconStyling = statesTmp.matIconStyling || '';
    } else {
      this.activeState.hasMatIcon = false;
    }

    if (statesTmp.customIcon) {
      this.activeState.hasCustomIcon = true;
    } else {
      this.activeState.hasCustomIcon = false;
    }

    this.activeState.matIcon = statesTmp.matIcon || '';
    this.activeState.customIcon = statesTmp.customIcon || '';

    if (statesTmp.color && this.options.useColorOfStates) {
      this.activeState.color = this.options.colorStatePanel = statesTmp.color;
    }

    this.activeState.label = statesTmp.value;
    this.data.value = statesTmp.value;
  }

  private afterSwipeLeft(): void {
    if (this.activeState.index - 1 >= 0) {
      this.activeState.index--;
      this.updateLabelOnSwipe();
    }

    this.dataChange.emit(this.data);
  }

  private afterSwipeRight(): void {
    if (this.activeState.index + 1 < this.options.states.length) {
      this.activeState.index++;
      this.updateLabelOnSwipe();
    }

    this.dataChange.emit(this.data);
  }

  private afterSwiped(): void {
    const rightswipeDetectvalue = this.actualScreenWidth / 100 * this.options.minSwipePercent;
    const leftswipeDetectvalue = -rightswipeDetectvalue;

    if (this.relativeX <= leftswipeDetectvalue || this.relativeX <= -this.options.maxSwipePx) {
      this.afterSwipeLeft();
    } else if (this.relativeX >= rightswipeDetectvalue || this.relativeX >= this.options.maxSwipePx) {
      this.afterSwipeRight();
    } else if (this.options.useSwipeTouch) {
        this.touch.emit(this.data);
    }
  }

  swipe(x: number, y: number) {
    if (!this.canSwipe) { return; }

    if (this.firstX === undefined) {
      this.firstX = x;
      this.onSwipeStart();
    }

    if (this.firstY === undefined) {
      this.firstY = y;
    }

    this.relativeX = x - this.firstX;
    this.relativeY = y - this.firstY;
    if (Math.abs(this.relativeX) > this.deadSpace) {
      this.swiping = true;
    }

    if (this.swiping && -this.localSavedInnerWidth < this.relativeX && this.relativeX < this.localSavedInnerWidth) {
      this.positionElement();
    }
  }

  down() {
    this.canSwipe = true;
  }

  up() {
    if (!this.swiping) {
      if (Math.abs(this.relativeX) < this.deadSpace && Math.abs(this.relativeY) < this.deadSpace) {
        this.touch.emit(this.data);
      }
    }
    this.onSwipeEnd();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.setActiveScreenWidth();
  }

  @HostListener('touchstart') onTouchStart() {
    this.down();
  }

  @HostListener('mousedown') onMouseDown() {
    this.down();
  }

  @HostListener('touchmove', ['$event']) onTouchMove(event: TouchEvent) {
    this.swipe(event.touches[0].screenX, event.touches[0].screenY);
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    this.swipe(event.screenX, event.screenY);
  }

  @HostListener('touchend') onTouchEnd() {
    this.up();
  }

  @HostListener('mouseup') onMouseUp() {
    this.up();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.onSwipeEnd();
  }

  private onSwipeStart(): void {
    this.localSavedInnerWidth = window.innerWidth;
    this.swiping = true;

    this.onSwipe();
  }

  private onSwipeEnd(): void {
    this.firstX = undefined;
    this.firstY = undefined;
    this.swiping = false;
    this.afterSwiped();
    this.relativeX = 0;
    this.relativeY = 0;
    this.canSwipe = false;
  }

  private positionElement(): void {
    const relativeXpx = this.relativeX.toString() + 'px';
    const width = this.elementToMove.nativeElement.offsetWidth;

    if (-width <= this.relativeX && this.relativeX <= width) {
      this.renderer.setStyle(this.elementToMove.nativeElement, 'position', 'relative');
      this.renderer.setStyle(this.elementToMove.nativeElement, 'left', relativeXpx);
    }
  }
}
