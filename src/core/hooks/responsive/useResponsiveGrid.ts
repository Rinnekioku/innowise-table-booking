import { useEffect, useState } from 'react';
import { blockSpans } from '../../constants/gridSettings';
import { displaySizes, displaySizesNames } from '../../constants/displaySizes';
import { useDisplaySize } from './useDisplaySize';

export function useResponsiveGrid(): number {
    const [colSpan, setColSpan] = useState<number>(blockSpans.xl);
    const displaySize = useDisplaySize();
    
    useEffect(() => {
        switch (displaySize) {
        case displaySizesNames.xl:
            setColSpan(displaySizes.xl);
            break;
        case displaySizesNames.lg:
            setColSpan(displaySizes.lg);
            break;
        case displaySizesNames.md:
            setColSpan(displaySizes.md);
            break;
        case displaySizesNames.sm:
            setColSpan(displaySizes.sm);
            break;
        case displaySizesNames.xs:
            setColSpan(displaySizes.xs);
            break;
        }
    }, [displaySize]);
    
    return colSpan;
}