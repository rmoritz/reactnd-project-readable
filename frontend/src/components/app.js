import React from 'react';
import * as ReactRedux from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Panel, Container, Heading } from 'rebass';
import { loadPosts } from '../actions/posts';
import { loadCategories } from '../actions/categories';
import { loadIcons } from '../utils/icons';
import PostsSummary from '../components/posts-summary';
import PostEditor from '../components/post-editor.js';

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
                <Switch>
                  <Route
                    exact path="/"
                    component={PostsSummary} />
                  <Route
                    exact path="/add"
                    component={PostEditor} />
                  <Route
                    exact path="/(react|redux|udacity)"
                    component={PostsSummary} />
                </Switch>
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

export default withRouter(ReactRedux.connect()(App));
