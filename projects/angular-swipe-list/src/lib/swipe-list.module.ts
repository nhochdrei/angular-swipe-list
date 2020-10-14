import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SwipeCellComponent } from './swipe-cell/swipe-cell.component';
import { SwipeListComponent } from './swipe-list/swipe-list.component';



@NgModule({
  declarations: [SwipeListComponent, SwipeCellComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HammerModule,
  ],
  exports: [SwipeListComponent, SwipeCellComponent]
})
export class SwipeListModule { }
