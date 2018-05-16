import React from 'react';
import * as ReactRedux from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Panel, Container, Heading } from 'rebass';
import { loadPosts } from '../actions/posts';
import { loadCategories } from '../actions/categories';
import { loadIcons } from '../utils/icons';
import PostsSummary from './posts-summary';
import PostDetails from './post-details';
import { PlainLink } from './custom-styled';
import NotFound from './not-found';

class App extends React.Component {
    render() {
        return (
            <Container>
              <Panel>
                <Panel.Header
                  color='white'
                  bg='black'>
                  <PlainLink to="/">
                    <Heading children="Readable" />
                  </PlainLink>
                </Panel.Header>
                <Switch>
                  <Route
                    exact path="/"
                    component={PostsSummary} />
                  <Route
                    exact path="/(react|redux|udacity)"
                    component={PostsSummary} />
                  <Route
                    exact path="/(react|redux|udacity)/:postId"
                    component={PostDetails} />
                  <Route component={NotFound} />
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
