export interface SwipelistData {
    label: string;
    value?: string;
    defaultStartIndex?: number;
}

export interface SwipelistState {
    value: string;
    color?: string;
    label?: string;
    matIcon?: string;
    matIconStyling?: string;
    customIcon?: string;
}

export interface SwipelistOptions {
    states?: SwipelistState[];
    displayStateValue?: boolean;
    hasStates?: boolean;
    statesAtLeft?: boolean;
    statePanelWidth?: string;
    stateFontSize?: string;
    colorCenter?: string;
    colorStatePanel?: string;
    useColorOfStates?: boolean;
    colorText?: string;
    borderRadius?: string;
    height?: string;
    listFontsize?: string;
    minSwipePercent?: number;
    maxSwipePx?: number;
}
