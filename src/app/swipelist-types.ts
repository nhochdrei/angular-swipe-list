export class SwipelistData {
    label: string;
    value?: string;
    defaultStartIndex?: number;
}

export class SwipelistState {
    value: string;
    color?: string;
    label?: string;
}

export class SwipelistOptions {
    states?: SwipelistState[];
    hasStates?: boolean;
    colorCenter?: string;
    colorStatePanel?: string;
    colorText?: string;
    leftLabel?: string;
    rightLabel?: string;
    borderRadius?: string;
    height?: string;
    statePanelWidth?: string;
}
