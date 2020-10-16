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
      matIcon: 'code'
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
      label: 'XMas',
      matIcon: 'http'
    },
    {
      value: 'Y',
      color: 'rgb(180, 50, 15)',
      label: 'Y Wing Geschwader'
    }
  ];

  options: SwipelistOptions = {
    colorCenter: 'rgb(37, 39, 44)',
    colorStatePanel: 'rgb(0, 0, 0)',
    colorText: 'white',
    borderRadius: '4px',
    height: '100px',
    statePanelWidth: '50px',
    hasStates: true,
    states: this.statesToInsert
  };

  dataToInsert: SwipelistData[] = [
    {
      label: 'Test1',
      defaultStartIndex: 1
    },
    {
      label: 'Schrift',
      defaultStartIndex: 2
    },
    {
      label: 'Test',
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

  onOutput() {
    console.log(this.dataToInsertSecond);
  }
}
