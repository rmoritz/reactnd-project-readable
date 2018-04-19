import * as Rebass from 'rebass';
import sys from 'system-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export const Subhead = sys({
    is: Rebass.Subhead,
    mx: 2
});

export const Column = sys({
    is: Rebass.Column,
    mb: 0,
    bg: 'gray',
    px: 3,
    py: 1,
    border: 1
});

export const LinkColumn = sys({
    is: Column
}, props => ({
    cursor: 'pointer'
}));

export const LinkButton = sys({
    is: Rebass.Button,
    bg: 'black',
    fg: 'white'
}, props => ({
    cursor: 'pointer'
}));

export const LinkIcon = sys({
    is: FontAwesomeIcon
}, props => ({
    cursor: 'pointer'
}));
