import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { displaySizes, displaySizesNames } from '../../constants/displaySizes';

export function useDisplaySize(): string {
    const [displaySize, setDisplaySize] = useState<string>(displaySizesNames.lg);
    const isXl = useMediaQuery({
        minWidth: displaySizes.xl,
    });
    const isLg = useMediaQuery({
        minWidth: displaySizes.lg,
    });
    const isMd = useMediaQuery({
        minWidth: displaySizes.md,
    });
    const isSm = useMediaQuery({
        minWidth: displaySizes.sm,
    });
    const isXs = useMediaQuery({
        minWidth: displaySizes.xs,
    });

    useEffect(() => {
        if (isXl) {
            setDisplaySize(displaySizesNames.xl);
        } else if (isLg) {
            setDisplaySize(displaySizesNames.lg);
        } else if (isMd) {
            setDisplaySize(displaySizesNames.md);
        } else if (isSm) {
            setDisplaySize(displaySizesNames.sm);
        } else if (isXs) {
            setDisplaySize(displaySizesNames.xs);
        }
    }, [isXl, isLg, isMd, isSm, isXs]);

    return displaySize;
}