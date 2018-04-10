import React from 'react';
import * as ReactRedux from 'react-redux';
import PostList from './PostList';
import { loadPosts } from '../actions/posts';

class App extends React.Component {
    render() {
        return (
            <PostList />
        );
    }

    componentWillMount() {
        this.props.load();
    }    
}

function mapStateToProps() {
}

function mapDispatchToProps(dispatch) {
    return {
        load: () => dispatch(loadPosts())
    };
}

export default ReactRedux.connect(
    mapStateToProps,
    mapDispatchToProps)(App);