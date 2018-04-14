import * as Rebass from 'rebass';
import sys from 'system-components';

const Subhead = sys({
    is: Rebass.Subhead,
    mx: 2
});

const Column = sys({
    is: Rebass.Column,
    mb: 0,
    bg: 'gray',
    px: 3,
    py: 1,
    border: 1
});

export { Subhead, Column };
