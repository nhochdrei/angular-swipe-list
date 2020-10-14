import { Injectable } from '@angular/core';
import { SwipelistData, SwipelistOptions } from './swipelist-types';

@Injectable({
  providedIn: 'root'
})
export class StandardvaluesService {

  constructor() { }

  getStandardOptionValues(options: SwipelistOptions): SwipelistOptions {

    const standardStates = [
      {
        value: 'left',
        color: 'rgb(200, 200, 200)'
      },
      {
        value: 'right',
        color: 'rgb(200, 200, 200)'
      }
    ];

    if (options !== undefined) {

      if (options.states === undefined) {
        options.states = standardStates;
      }

      if (options.hasStates === undefined) {
        options.hasStates = false;
      }

      if (options.height === undefined) {
        options.height = '50px';
      }

      if (options.colorCenter === undefined) {
        options.colorCenter = 'rgb(256, 256, 256)';
      }

      if (options.colorText === undefined) {
        options.colorText = 'black';
      }
    } else {
      options = {
        states: standardStates,
        hasStates: false,
        height: '50px',
        colorCenter: 'rgb(256, 256, 256)'
      };
    }

    return options;
  }

  getStandardDataValues(data: SwipelistData): SwipelistData {
    if (data.defaultStartIndex === undefined) {
      data.defaultStartIndex = 0;
    }

    return data;
  }
}
