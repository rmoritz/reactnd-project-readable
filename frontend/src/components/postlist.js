import React from 'react';
import * as ReactRedux from 'react-redux';
import { Row, Text, Truncate } from 'rebass';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Column } from './custom-styled';

class PostList extends React.Component {
    static propTypes = {
        predicate: PropTypes.func
    }

    render() {
        let { posts } = this.props;
        const { predicate } = this.props;

        if (predicate) {
            posts = posts.filter(p => predicate(p));
        }

        if (!posts.length) {
            return <Text mx={2} children="No posts to display" />;
        }

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
                          <FontAwesomeIcon icon="thumbs-up"/>
                        </Column>
                        <Column width={1/20}>
                          <FontAwesomeIcon icon="thumbs-down"/>
                        </Column>
                        <Column width={1/20}>
                          <FontAwesomeIcon icon="edit"/>
                        </Column>
                        <Column width={1/20}>
                          <FontAwesomeIcon icon="trash"/>
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

export default ReactRedux.connect(
    mapStateToProps)(PostList);
