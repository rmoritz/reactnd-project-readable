import { Column } from 'rebass';
import sys from 'system-components';

const HColumn = sys({
    is: Column,
    mb: 0,
    bg: 'gray',
    px: 3,
    py: 1,
    borderWidth: 1,
    borderColor: 'darkgray'
});

const BColumn = sys({
    is: Column,
    mb: 0,
    bg: 'lightgray',
    px: 3,
    py: 1,
    borderWidth: 1,
    borderColor: 'darkgray'
});

export { HColumn, BColumn };
