import React from 'react';
import * as ReactRedux from 'react-redux';
import { Row, Text, Truncate } from 'rebass';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import Moment from 'react-moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Column, LinkColumn, LinkIcon, PlainLink } from './custom-styled';
import * as PostActions from '../actions/posts';

class PostList extends React.Component {
    static propTypes = {
        predicate: PropTypes.func,
        editPost: PropTypes.func.isRequired,
    }

    constructor() {
        super();

        this.state = {
            sortField: 'timestamp',
            sortDir: '-'
        };
    }

    setSortOrder(field) {
        const state = this.state;
        const toggleSortDir = () => {
            return state.sortDir === '-' ? '' : '-';
        };

        if (field === state.sortField) {
            this.setState({
                ...state,
                sortDir: toggleSortDir()
            });
        }
        else {
            this.setState({
                ...state,
                sortField: field,
                sortDir: '-'
            });
        }
    }

    sortIcon() {
        const { sortDir } = this.state;
        return sortDir === '-' ? 'sort-down' : 'sort-up';
    }

    render() {
        let { posts } = this.props;
        const {
            predicate,
            upvotePost,
            downvotePost,
            deletePost,
            editPost
        } = this.props;
        const {
            sortDir,
            sortField
        } = this.state;

        if (predicate) {
            posts = posts.filter(p => predicate(p));
        }

        if (!posts.length) {
            return <Text mx={2} children="No posts to display" />;
        }

        posts.sort(sortBy(`${sortDir}${sortField}`));
        const sortDirIcon = this.sortIcon();

        return (
            <div>
              <Row>
                <Column bg='lightgray' width={25/100}>Title</Column>
                <Column bg='lightgray' width={15/100}>Author</Column>
                <Column bg='lightgray' width={10/100}>Comments</Column>
                <LinkColumn bg='lightgray'
                            width={10/100}
                            onClick={() => this.setSortOrder('voteScore')}>
                  Score &nbsp; { sortField === 'voteScore' && <FontAwesomeIcon icon={sortDirIcon} /> }
                </LinkColumn>
                <LinkColumn bg='lightgray'
                            width={15/100}
                            onClick={() => this.setSortOrder('timestamp')}>
                  Created &nbsp; { sortField === 'timestamp' && <FontAwesomeIcon icon={sortDirIcon} /> }
                </LinkColumn>
                <Column bg='lightgray' width={5/100} />
                <Column bg='lightgray' width={5/100} />
                <Column bg='lightgray' width={5/100} />
                <Column bg='lightgray' width={5/100} />
              </Row>
              {
                  posts.map(p => (
                      <Row key={p.id}>
                        <Column width={25/100}>
                          <PlainLink to={`${p.category}/${p.id}`}>
                            <Truncate>{p.title}</Truncate>
                          </PlainLink>
                        </Column>
                        <Column width={15/100}>{p.author}</Column>
                        <Column width={10/100}>{p.commentCount}</Column>
                        <Column width={10/100}>{p.voteScore}</Column>
                        <Column width={15/100}>
                          <Moment interval={0} format="L LTS">
                            {p.timestamp}
                          </Moment>
                        </Column>
                        <Column width={5/100}>
                          <LinkIcon icon="thumbs-up"
                                    onClick={() => upvotePost(p.id)} />
                        </Column>
                        <Column width={5/100}>
                          <LinkIcon icon="thumbs-down"
                                    onClick={() => downvotePost(p.id)} />
                        </Column>
                        <Column width={5/100}>
                          <LinkIcon icon="edit"
                                    onClick={() => editPost(p) }/>
                        </Column>
                        <Column width={5/100}>
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
    return { posts };
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
