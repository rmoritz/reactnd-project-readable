import React from 'react';
import * as ReactRedux from 'react-redux';
import { Row, Text, Truncate } from 'rebass';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { HColumn, BColumn } from './custom-styled';

class PostList extends React.Component {
    static propTypes = {
        predicate: PropTypes.func
    }

    render() {
        let posts = this.props.posts || [];

        const { predicate } = this.props;
        if (predicate) {
            posts = posts.filter(p => predicate(p));
        }

        if (!posts.length) {
            return <Text children="No posts to display" />;
        }

        return (
            <div>
              <Row>
                <HColumn width={3/10}>Title</HColumn>
                <HColumn width={2/10}>Author</HColumn>
                <HColumn width={1/10}>Comments</HColumn>
                <HColumn width={1/10}>Score</HColumn>
                <HColumn width={1/20} />
                <HColumn width={1/20} />
                <HColumn width={1/20} />
                <HColumn width={1/20} />
              </Row>
              {
                  posts.map(p => (
                      <Row key={p.id}>
                        <BColumn width={3/10}>
                          <Truncate>{p.title}</Truncate>
                        </BColumn>
                        <BColumn width={2/10}>{p.author}</BColumn>
                        <BColumn width={1/10}>{p.commentCount}</BColumn>
                        <BColumn width={1/10}>{p.voteScore}</BColumn>
                        <BColumn width={1/20}>
                          <FontAwesomeIcon icon="thumbs-up"/>
                        </BColumn>
                        <BColumn width={1/20}>
                          <FontAwesomeIcon icon="thumbs-down"/>
                        </BColumn>
                        <BColumn width={1/20}>
                          <FontAwesomeIcon icon="edit"/>
                        </BColumn>
                        <BColumn width={1/20}>
                          <FontAwesomeIcon icon="trash"/>
                        </BColumn>
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
