import { Gutter } from 'antd/lib/grid/row';

const blockVerticalMargin: Gutter = 20;
const blockHorizontalMargin: Gutter = 20;

export const blockMargin: [Gutter, Gutter] = [blockHorizontalMargin, blockVerticalMargin];

export enum blockSpans {
    xl = 4,
    lg = 6,
    md = 8,
    sm = 12,
    xs = 24,
}

export const loaderAlign = 'center';
export const errorAlign = 'center';