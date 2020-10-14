import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwipeCellComponent } from './swipe-cell.component';

describe('SwipeCellComponent', () => {
  let component: SwipeCellComponent;
  let fixture: ComponentFixture<SwipeCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwipeCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwipeCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
