import React from 'react';
import * as ReactRedux from 'react-redux';
import { Row, Text, Truncate } from 'rebass';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import { Column, LinkIcon } from './custom-styled';
import * as PostActions from '../actions/posts';

class PostList extends React.Component {
    static propTypes = {
        predicate: PropTypes.func
    }

    render() {
        let { posts } = this.props;
        const {
            predicate,
            upvotePost,
            downvotePost,
            deletePost
        } = this.props;

        if (predicate) {
            posts = posts.filter(p => predicate(p));
        }

        if (!posts.length) {
            return <Text mx={2} children="No posts to display" />;
        }

        posts.sort(sortBy('title'));

        return (
            <div>
              <Row>
                <Column bg='lightgray' width={3/10}>Title</Column>
                <Column bg='lightgray' width={2/10}>Author</Column>
                <Column bg='lightgray' width={1/10}>Comments</Column>
                <Column bg='lightgray' width={1/10}>Score</Column>
                <Column bg='lightgray' width={1/20} />
                <Column bg='lightgray' width={1/20} />
                <Column bg='lightgray' width={1/20} />
                <Column bg='lightgray' width={1/20} />
              </Row>
              {
                  posts.map(p => (
                      <Row key={p.id}>
                        <Column width={3/10}>
                          <Truncate>{p.title}</Truncate>
                        </Column>
                        <Column width={2/10}>{p.author}</Column>
                        <Column width={1/10}>{p.commentCount}</Column>
                        <Column width={1/10}>{p.voteScore}</Column>
                        <Column width={1/20}>
                          <LinkIcon icon="thumbs-up"
                                    onClick={() => upvotePost(p.id)} />
                        </Column>
                        <Column width={1/20}>
                          <LinkIcon icon="thumbs-down"
                                    onClick={() => downvotePost(p.id)} />
                        </Column>
                        <Column width={1/20}>
                          <LinkIcon icon="edit" />
                        </Column>
                        <Column width={1/20}>
                          <LinkIcon icon="trash"
                                    onClick={() => deletePost(p.id)} />
                        </Column>
                      </Row>
                  ))
              }
            </div>
        );
    }
}

function mapStateToProps({ posts }) {
    return {
        posts: posts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        upvotePost: (id) => dispatch(PostActions.upvotePost(id)),
        downvotePost: (id) => dispatch(PostActions.downvotePost(id)),
        deletePost: (id) => dispatch(PostActions.deletePost(id))
    };
}

export default ReactRedux.connect(
    mapStateToProps, mapDispatchToProps)(PostList);
