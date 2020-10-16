## Install

`npm i @nhochdrei/angular-swipe-list --save`

To bee able to use it, don't forget to import the `SwipeListModule` in your app.module.ts.

>**This swipe-list works only on mobile devices and thus in-browser mobile mode too.**

## Demo

[Stackblitz](https://stackblitz.com/edit/angular-swipe-list-demo)

## Use

For the basic setup you need the 
```html 
<n3-swipe-list [data]="dataArray"></n3-swipe-list>
``` 
html part and, of course, the object itself.
The advanced version: 
```html 
<n3-swipe-list [data]="dataArray" [options]="optionObject"></n3-swipe-list>
```
You can use the `options` binding to style the list or to set own states.

Speaking of states, this swipe-list is capable of an additional display of the actual state which your list element is in.

`data` can be a two-way binding. You can use the `(dataChange)` event too, this event is triggered on every swipe. Your `data` object will update automatically on every swipe no matter if you're listing on the object or not.
```html
<n3-swipe-list
  [data]="dataToInsert"
  [options]="options"
  (dataChange)="onDataChange()">
</n3-swipe-list>
```

### Structure

The basic setup for a list without the displaying of the state consists of a list of swipe-cells. Each swipe-cell has a left, right and centre element. The middle element is the one which shows the label from the data object.

The left and right elements can be seen if you're swiping to one of the directions. In this case, the right element is placed right, you can see it if you're swiping to the left side.

There is no limit to the number of states you can use, that's where the `defaultStartIndex` comes to life. For example, You want to use 3 different states, `delete`, `archive` and `spam`.
In our little example, the goal is a list where the user can select the needed operations on multiple elements. After the user selected all the operations she/he clicks a button and all the operations get executed.
To display the active state of each element we use the `options.hasStates` and set it to true. On every row, the standard state is set to `delete` for now. To change that just set the `defaultStartIndex` to 1. Now the standard state is `archive`, the counting starts from 0.

### Data

The SwipelistData object has the following fields:
```typescript
SwipelistData {
    label: string;
    value?: string;
    defaultStartIndex?: number;
}
```
The only field you have to use to get the swipe-list run is the `label` one. This field represents the list element.
Each data object will have a value field, at least after the assigned swipe-cell got swiped. After every swipe, the `value` field will hold the state information. The state information is a custom assigned value or, depending on the direction of the swipe, `left` or `right`.

`defaultStartIndex`: An array index to set a default `value` from the states array if you got one

### Options

SwipelistOptions object:
``` typescript
SwipelistOptions {
    states?: SwipelistState[];
    hasStates?: boolean;
    colorCenter?: string;
    colorStatePanel?: string;
    colorText?: string;
    borderRadius?: string;
    height?: string;
    statePanelWidth?: string;
}
```
`states`: An array of states

`hasStates`: If you want to display the actual state, this has to be true. You can set your own states anyways, they will get used

`colorCenter`: The background-colour for the middle element

`colorStatePanel`: The background-colour for the display of the actual state

`colorText`: Sets the text/font-colour for the complete list

`borderRadius`: If you want to, you can get rounded borders for the centre element. They only can be seen while swiping

`height`: The height for each of your list-elements

`statePanelWidth`: The width for your display of the active state

### States

SwipelistState object:
```typescript
SwipelistState {
    value: string;
    color?: string;
    label?: string;
    matIcon?: string;
    customIcon?: string;
}
```
`value`: The value which will be displayed and set to your `data` object

`color`: The colour which will be displayed while swiping

`label`: The text which will be displayed while swiping

`matIcon`: If you use angular material icons just write the name of the icon down here

`customIcon`: Use this if you want to use a none material design icon