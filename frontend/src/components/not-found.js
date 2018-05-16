import React from 'react';
import * as ReactRedux from 'react-redux';
import { Box,Heading } from 'rebass';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

class NotFound extends React.Component {
    render() {
        return (
            <Box p={4}>
                <Heading>
                    <FontAwesomeIcon icon="binoculars" /> &nbsp; Page not found
                </Heading>
            </Box>
        );
    }
}

export default ReactRedux.connect()(NotFound);