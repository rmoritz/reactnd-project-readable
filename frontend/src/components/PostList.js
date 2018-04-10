import React from 'react';
import * as ReactRedux from 'react-redux';
import { Flex, Box } from 'grid-styled';
import PropTypes from 'prop-types';

class PostList extends React.Component {
    static PropTypes = {
        filter: PropTypes.func
    }

    render() {
        const { filter } = this.props;
        let posts = this.props.posts || [];

        if (filter) {
            posts = posts.filter(p => filter(p));
        }

        return posts.map(p => (
            <Flex key={p.id}>
                <Box width={1/5} p={1} my={1}>{p.title}</Box>
                <Box width={1/5} p={1} my={1}>{p.author}</Box>
                <Box width={1/10} p={1} my={1}>{p.commentCount}</Box>
                <Box width={1/10} p={1} my={1}>{p.voteScore}</Box>
                <Box width={1/10} p={1} my={1}>A</Box>
                <Box width={1/10} p={1} my={1}>B</Box>
                <Box width={1/10} p={1} my={1}>C</Box>
                <Box width={1/10} p={1} my={1}>D</Box>
            </Flex>
        ));
    }
}

function mapStateToProps({ posts }) {
    return {
        posts: posts
    };
}

function mapDispatchToProps(dispatch) {
}

export default ReactRedux.connect(
    mapStateToProps,
    mapDispatchToProps)(PostList);