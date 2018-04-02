import React from 'react';
import * as ReactRedux from 'react-redux';
import { loadPosts }  from '../actions/posts';

class App extends React.Component {
    render() {
        const posts = this.props.posts || [];

        return (
            <div>
              <header>
                <h1>Readable</h1>
              </header>
              {
                  posts.map(p => (
                      <article>
                        <h2>{p.title}</h2>
                      </article>))
              }
            </div>
        );
    }

    componentWillMount() {
        this.props.load();
    }
}

function mapStateToProps({ posts }) {
    return {
        posts: posts
    };
}

function mapDispatchToProps(dispatch) {
  return {
      load: () => dispatch(loadPosts())
  };
}

export default ReactRedux.connect(
    mapStateToProps,
    mapDispatchToProps)(App);
