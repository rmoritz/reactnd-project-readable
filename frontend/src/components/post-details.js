import React from 'react';
import * as ReactRedux from 'react-redux';
import { Truncate, Text, Label, Row, Column } from 'rebass';
import { loadCommentsForPost } from '../actions/comments'
import CommentList from './comment-list';
import { Subhead, LinkIcon } from './custom-styled';

class PostDetails extends React.Component {
    render() {
        const { match, posts } = this.props;
        const { postId } = match.params;
        const p = posts.find((p) => p.id === postId);

        return (
            (p &&
            <div>
                <Subhead my={4} children={p.title} />
                <Row>
                    <Column width={2/5}>{p.author}</Column>
                    <Column width={1/5}>{p.voteScore}</Column>
                    <Column width={1/5}><LinkIcon icon="thumbs-up" /></Column>
                    <Column width={1/5}><LinkIcon icon="thumbs-down" /></Column>
                </Row>
                <Row>
                    <Column>{p.body}</Column>
                </Row>                
                <Subhead my={4} children={`${p.commentCount} comments`} />
                <CommentList for={postId} />
            </div>) || null
        )
    }

    componentWillMount() {
        const { match, dispatch } = this.props;
        const { postId } = match.params;

        dispatch(loadCommentsForPost(postId));
    }
}

function mapStateToProps({ posts }) {
    return { posts };
}

export default ReactRedux.connect(mapStateToProps)(PostDetails);
