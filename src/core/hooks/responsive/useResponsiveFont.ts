import { useEffect, useState } from 'react';
import { displaySizesNames } from '../../constants/displaySizes';
import { fontSizes } from '../../constants/fontSizes';
import { useDisplaySize } from './useDisplaySize';

export function useResponsiveFont(): number {
    const [fontSize, setFontSize] = useState<number>(fontSizes.xl);
    const displaySize = useDisplaySize();

    useEffect(() => {
        switch (displaySize) {
        case displaySizesNames.xl:
            setFontSize(fontSizes.xl);
            break;
        case displaySizesNames.lg:
            setFontSize(fontSizes.lg);
            break;
        case displaySizesNames.md:
            setFontSize(fontSizes.md);
            break;
        case displaySizesNames.sm:
            setFontSize(fontSizes.sm);
            break;
        case displaySizesNames.xs:
            setFontSize(fontSizes.xs);
            break;
        }
    }, [displaySize]);

    return fontSize;
}
