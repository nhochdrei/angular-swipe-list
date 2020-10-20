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

  @ViewChild('leftDiv') leftElement: ElementRef;
  @ViewChild('cell') elementToMove: ElementRef;
  @ViewChild('rightDiv') rightElement: ElementRef;

  linearGradientString: string;

  private actualScreenWidth: number;
  private firstX: number;
  private relativeX: number;
  private localSavedInnerWidth: number;
  swiped = false;

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
    if (statesTmp.color && this.options.useColorOfStates) { this.activeState.color = this.options.colorStatePanel = statesTmp.color; }

    if (statesTmp.matIcon !== undefined) { this.activeState.hasMatIcon = true; }
    this.activeState.matIcon = statesTmp.matIcon || '';
    this.activeState.matIconStyling = statesTmp.matIconStyling || '';

    if (statesTmp.customIcon !== undefined) { this.activeState.hasCustomIcon = true; }
    this.activeState.customIcon = statesTmp.customIcon || '';

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

  private setActiveScreenWidth(): void {
    this.actualScreenWidth = window.innerWidth;
  }

  private onSwipe(): void {
    this.setLeftAndRightStates();
    this.setGradient();
  }

  private updateLabelOnSwipe(): void {
    const statesTmp = this.options.states[this.activeState.index];

    if (statesTmp.matIcon !== undefined) {
      this.activeState.hasMatIcon = true;
      this.activeState.matIconStyling = statesTmp.matIconStyling || '';
    } else {
      this.activeState.hasMatIcon = false;
    }

    if (statesTmp.customIcon !== undefined) {
      this.activeState.hasCustomIcon = true;
    } else {
      this.activeState.hasCustomIcon = false;
    }

    this.activeState.matIcon = statesTmp.matIcon || '';
    this.activeState.customIcon = statesTmp.customIcon || '';

    if (statesTmp.color && this.options.useColorOfStates) { this.activeState.color = this.options.colorStatePanel = statesTmp.color; }

    this.activeState.label =
      statesTmp.value;
    this.data.value =
      statesTmp.value;
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
    const rightswipeDetectvalue = this.actualScreenWidth / 100 * this.options.minSwipePercent;
    const leftswipeDetectvalue = rightswipeDetectvalue * -1;

    if (this.relativeX <= leftswipeDetectvalue || this.relativeX <= (this.options.maxSwipePx * -1)) {
      this.afterSwipeLeft();
    } else if (this.relativeX >= rightswipeDetectvalue || this.relativeX >= this.options.maxSwipePx) {
      this.afterSwipeRight();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.setActiveScreenWidth();
  }

  @HostListener('touchstart') onTouchStart() {
    this.onSwipeStart();
  }

  @HostListener('mousedown') onMouseDown() {
    this.onSwipeStart();
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

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    if (this.swiped === true) {
      if (this.firstX === undefined) {
        this.firstX = event.screenX;
      }

      const actualX = event.screenX;
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
  }

  @HostListener('touchend') onTouchEnd() {
    this.onSwipeEnd();
  }

  @HostListener('mouseup') onMouseUp() {
    this.onSwipeEnd();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.onSwipeEnd();
  }

  private onSwipeStart(): void {
    this.localSavedInnerWidth = window.innerWidth;
    this.swiped = true;

    this.onSwipe();
  }

  private onSwipeEnd(): void {
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
