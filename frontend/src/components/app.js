import React from 'react';
import * as ReactRedux from 'react-redux';
import { Route } from 'react-router-dom';
import { Panel, Container, Heading } from 'rebass';
import { loadPosts } from '../actions/posts';
import { loadCategories } from '../actions/categories';
import { loadIcons } from '../utils/icons';
import PostsSummary from '../components/posts-summary';

class App extends React.Component {
    render() {
        return (
            <Container>
              <Panel>
                <Panel.Header
                  color='white'
                  bg='black'>
                  <Heading children="Readable"/>
                </Panel.Header>
                <Route
                  exact path="/"
                  component={PostsSummary} />
                <Route
                  exact path="/:category"
                  component={PostsSummary} />
              </Panel>
            </Container>
        );
    }

    componentWillMount() {
        loadIcons();

        const { dispatch } = this.props;

        dispatch(loadCategories());
        dispatch(loadPosts());
    }
}

export default ReactRedux.connect()(App);
