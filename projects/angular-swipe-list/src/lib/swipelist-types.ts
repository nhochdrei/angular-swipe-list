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
    customIcon?: string;
}

export interface SwipelistOptions {
    states?: SwipelistState[];
    hasStates?: boolean;
    colorCenter?: string;
    colorStatePanel?: string;
    colorText?: string;
    borderRadius?: string;
    height?: string;
    statePanelWidth?: string;
}
