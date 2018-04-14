import React from 'react';
import * as ReactRedux from 'react-redux';
import { Route } from 'react-router-dom';
import { Panel, Container, Heading, Subhead } from 'rebass';
import PostList from './postlist';
import { loadPosts } from '../actions/posts';
import { loadIcons } from '../utils/icons';

const AllPosts = () => (
    <div>
      <Subhead mt={25} mb={25} children="All posts" />
      <PostList />
    </div>
);

const PostsInCategory = ({ match }) => (
    <div>
      <Subhead mt={25} mb={25} children={`Posts in category ${match.params.category}`} />
      <PostList predicate={(post) => post.category === match.params.category} />
    </div>
);

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
                  component={AllPosts} />
                <Route
                  exact path="/:category"
                  component={PostsInCategory} />
              </Panel>
            </Container>
        );
    }

    componentWillMount() {
        loadIcons();

        const { dispatch } = this.props;
        dispatch(loadPosts());
    }    
}

export default ReactRedux.connect()(App);
