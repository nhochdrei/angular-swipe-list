import { Component } from '@angular/core';
import { SwipelistData, SwipelistOptions, SwipelistState } from 'angular-swipe-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'swipe-list-test';

  statesToInsert: SwipelistState[] = [
    {
      value: 'V',
      color: 'rgb(0, 140, 255)',
      label: 'Verwaltung'
    },
    {
      value: 'A',
      color: 'rgb(6, 182, 0)',
      label: 'Automatisch',
      matIcon: 'code',
      matIconStyling: 'color: rgb(120, 180, 120); font-size: 36px;'
    },
    {
      value: 'M',
      color: 'rgb(80, 120, 120)',
      label: 'Manuell',
      customIcon: '<span>T 9500</span>'
    },
    {
      value: 'X',
      color: 'rgb(50, 120, 180)',
      label: 'XMas'
    },
    {
      value: 'Y',
      color: 'rgb(180, 50, 15)',
      label: 'Y Wing Geschwader'
    }
  ];

  options: SwipelistOptions = {
    states: this.statesToInsert,
    statePanelWidth: '60px',
    stateFontSize: '12pt',
    colorCenter: 'rgb(37, 39, 44)',
    colorStatePanel: 'rgb(0, 0, 0)',
    colorText: 'white',
    borderRadius: '4px',
    height: '100px',
    listFontsize: '12pt',
    minSwipePercent: 30,
    maxSwipePx: 700
  };

  dataToInsert: SwipelistData[] = [
    {
      label: 'Test1',
      defaultStartIndex: 1
    },
    {
      label: 'Test2',
      defaultStartIndex: 2
    },
    {
      label: 'Test3',
      defaultStartIndex: 0
    }
  ];

  dataToInsertSecond: SwipelistData[] = [
    {
      label: 'Hallo'
    },
    {
      label: 'Welt'
    }
  ];

  onOutput(event): void {
    const newData: SwipelistData = event;
    console.log(newData);
  }
}
