import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwipeListComponent } from './swipe-list.component';

describe('SwipeListComponent', () => {
  let component: SwipeListComponent;
  let fixture: ComponentFixture<SwipeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwipeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
