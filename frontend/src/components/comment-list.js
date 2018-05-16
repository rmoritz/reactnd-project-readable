import React from 'react';
import * as ReactRedux from 'react-redux';
import PropTypes from 'prop-types';
import { Badge, Text, Row, Column } from 'rebass';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import sortBy from 'sort-by';
import { LinkIcon } from './custom-styled';
import * as CommentActions from '../actions/comments';

class CommentList extends React.Component {
    static propTypes = {
        forPost: PropTypes.string.isRequired
    }

    render() {
        let { comments } = this.props;
        const {
            forPost,
            upvoteComment,
            downvoteComment,
            deleteComment
        } = this.props;

        comments = comments.filter((c) => c.parentId === forPost);
        comments.sort(sortBy('-voteScore'));

        return (
            <div>
                {
                    comments.map((c) =>
                        (
                            <div key={c.id}>
                                <Text>{c.body} <Badge fg='white' bg='black'>{c.author}</Badge></Text>
                                <Row width={1/2}>
                                    <Column width={1/5}>
                                        <FontAwesomeIcon icon="star" /> {c.voteScore}
                                    </Column>
                                    <Column width={1/5}>
                                      <LinkIcon icon="thumbs-up"
                                                onClick={() => upvoteComment(c.id)} />
                                    </Column>
                                    <Column width={1/5}>
                                      <LinkIcon icon="thumbs-down"
                                                onClick={() => downvoteComment(c.id)} />
                                    </Column>
                                    <Column width={1/5}>
                                        <LinkIcon icon="edit" />
                                    </Column>
                                    <Column width={1/5}>
                                      <LinkIcon icon="trash"
                                                onClick={() => deleteComment(c.id)} />
                                    </Column>
                                </Row>
                            </div>
                        ))
                }
            </div>
        );
    }
}

function mapStateToProps({ comments }) {
    return { comments };
}

function mapDispatchToProps(dispatch) {
    return {
        upvoteComment: (id) => dispatch(CommentActions.upvoteComment(id)),
        downvoteComment: (id) => dispatch(CommentActions.downvoteComment(id)),
        deleteComment: (id) => dispatch(CommentActions.deleteComment(id))
    };
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CommentList);
