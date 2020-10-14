# SwipeList

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.7.

## Code scaffolding

Run `ng generate component component-name --project swipe-list` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project swipe-list`.
> Note: Don't forget to add `--project swipe-list` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build swipe-list` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build swipe-list`, go to the dist folder `cd dist/swipe-list` and run `npm publish`.

## Running unit tests

Run `ng test swipe-list` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Install

`npm i @nhochdrei/angular-swipe-list --save`

To bee able to use it, don't forget to import the `SwipeListModule` in your app.module.ts.

## Use

For the basic setup you need the ```<n3-swipe-list [data]="dataArray"></n3-swipe-list>``` html part and, of course, the object itself.
The advanced version: ```<n3-swipe-list [data]="dataArray" [options]="optionObject"></n3-swipe-list>```, you can use the `options` binding to style the list or to set own states.

Speaking of states, this swipe-list is capable of an additional display of the actual state which your list element is in.

### Data

### Options

### States