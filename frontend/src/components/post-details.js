import React from 'react';
import * as ReactRedux from 'react-redux';
import { Badge, Box, Divider, Modal, Row, Column, Text } from 'rebass';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as CommentActions from '../actions/comments';
import * as PostActions from '../actions/posts';
import { Subhead, LinkIcon } from './custom-styled';
import PostEditor from './post-editor';
import CommentSummary from './comment-summary';
import CommentEditor from './comment-editor';
import NotFound from './not-found';

class PostDetails extends React.Component {
    constructor() {
        super();

        this.state = {
            postEditorVisible: false,
            commentEditorVisible: false,
            selectedComment: null
        };
    }

    render() {
        const {
            match,
            posts,
            upvotePost,
            downvotePost,
            savePost,
            deletePost,
            history,
            saveComment
        } = this.props;
        const { 
            postEditorVisible, 
            commentEditorVisible,
            selectedComment
        } = this.state;
        const { postId } = match.params;
        const p = posts.find((p) => p.id === postId);
        const togglePostEditorVisible = this.togglePostEditorVisible.bind(this);
        const toggleCommentEditorVisible = this.toggleCommentEditorVisible.bind(this);
        const savePostAndHideModal = 
              (post) => savePost(post)
              .then(() => togglePostEditorVisible());              
        const deletePostAndGoHome =
              (postId) => deletePost(postId)
              .then(() => history.push('/'));
        const saveCommentAndHideModal = 
              (comment) => saveComment(comment)
              .then(() => toggleCommentEditorVisible());
        const selectCommentAndToggleEditor =
            this.selectCommentAndToggleCommentEditorVisible.bind(this);

        return (
            (p &&
            <Box p={2}>
                {
                  (postEditorVisible &&
                   <Modal width={512}>
                      <PostEditor onSubmit={savePostAndHideModal}
                                  onCancel={togglePostEditorVisible}
                                  initialValues={p} />
                   </Modal>)
                }
                {
                  (commentEditorVisible &&
                   <Modal width={512}>
                      <CommentEditor onSubmit={saveCommentAndHideModal}
                                     onCancel={toggleCommentEditorVisible}
                                     initialValues={selectedComment} />
                   </Modal>)
                }
                <Subhead mt={4} mx={0}>
                    {p.title}
                    <Badge fg='white' bg='black'>{p.author}</Badge>
                </Subhead>
                <Text my={2}>{p.body}</Text>
                <Row width={1/2}>
                    <Column width={1/5}>
                      <FontAwesomeIcon icon="comments" /> {p.commentCount}
                    </Column>
                    <Column width={1/5}>
                      <FontAwesomeIcon icon="star" /> {p.voteScore}
                    </Column>
                    <Column width={1/5}>
                      <LinkIcon icon="thumbs-up"
                                onClick={() => upvotePost(p.id)} />
                    </Column>
                    <Column width={1/5}>
                      <LinkIcon icon="thumbs-down"
                                onClick={() => downvotePost(p.id)} />
                    </Column>
                    <Column width={1/5}>
                      <LinkIcon icon="edit"
                                onClick={togglePostEditorVisible} />
                    </Column>
                    <Column width={1/5}>
                      <LinkIcon icon="trash"
                                onClick={() => deletePostAndGoHome(p.id)}/>
                    </Column>
                </Row>
                <Divider w={1} color='black' />
                <CommentSummary parentId={postId}
                                editComment={selectCommentAndToggleEditor} />
            </Box>) || <NotFound />
        );
    }

    componentWillMount() {
        const { match, loadCommentsForPost } = this.props;
        const { postId } = match.params;

        loadCommentsForPost(postId);
    }

    togglePostEditorVisible() {
        const { postEditorVisible } = this.state;
        this.setState({
            ...this.state,
            postEditorVisible: !postEditorVisible
        });
    }

    toggleCommentEditorVisible() {
        const { commentEditorVisible } = this.state;
        this.setState({
            ...this.state,
            commentEditorVisible: !commentEditorVisible
        });
    }

    selectCommentAndToggleCommentEditorVisible(comment) {
        const { commentEditorVisible } = this.state;
        this.setState({
            ...this.state,
            selectedComment: comment,
            commentEditorVisible: !commentEditorVisible
        });
    }
}

function mapStateToProps({ posts }) {
    return { posts };
}

function mapDispatchToProps(dispatch) {
    return {
        savePost: (post) => {
            return dispatch(post.id 
                ? PostActions.updatePost(post) 
                : PostActions.createPost(post));
        },
        deletePost: (id) => dispatch(PostActions.deletePost(id)),
        upvotePost: (id) => dispatch(PostActions.upvotePost(id)),
        downvotePost: (id) => dispatch(PostActions.downvotePost(id)),
        loadCommentsForPost: (id) => dispatch(CommentActions.loadCommentsForPost(id)),
        saveComment: (comment) => {
            return dispatch(comment.id 
                ? CommentActions.updateComment(comment) 
                : CommentActions.createComment(comment));
        }
    };
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PostDetails);
