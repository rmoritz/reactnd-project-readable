import React from 'react';
import * as ReactRedux from 'react-redux';
import { Badge, Box, Divider, Modal, Row, Column, Text } from 'rebass';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as CommentActions from '../actions/comments';
import * as PostActions from '../actions/posts';
import CommentList from './comment-list';
import { Subhead, LinkIcon } from './custom-styled';
import PostEditor from './post-editor';

class PostDetails extends React.Component {
    constructor() {
        super();

        this.state = {
            postEditorVisible: false
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
            history
        } = this.props;
        const { postEditorVisible } = this.state;
        const { postId } = match.params;
        const p = posts.find((p) => p.id === postId);
        const toggleEditorVisibility = this.toggleEditorVisibility.bind(this);
        const savePostAndHideModal = 
              (post) => savePost(post)
              .then(() => toggleEditorVisibility());
        const deletePostAndGoHome =
              (postId) => deletePost(postId)
              .then(() => history.push('/'));

        return (
            (p &&
            <Box p={2}>
                {
                  (postEditorVisible &&
                   <Modal width={512}>
                      <PostEditor onSubmit={savePostAndHideModal}
                                  onCancel={toggleEditorVisibility}
                                  initialValues={p} />
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
                                onClick={toggleEditorVisibility} />
                    </Column>
                    <Column width={1/5}>
                      <LinkIcon icon="trash"
                                onClick={() => deletePostAndGoHome(p.id)}/>
                    </Column>
                </Row>
                <Divider w={1} color='black' />                
                <Subhead mt={4} mx={0} children="Comments" />
                <Box mt={2} ml={2}>
                    <CommentList forPost={postId} />
                </Box>
            </Box>) || null
        );
    }

    componentWillMount() {
        const { match, loadCommentsForPost } = this.props;
        const { postId } = match.params;

        loadCommentsForPost(postId);
    }

    toggleEditorVisibility(post) {
        const { postEditorVisible } = this.state;
        this.setState({
            ...this.state,
            postEditorVisible: !postEditorVisible
        });
    } 
}

function mapStateToProps({ posts }) {
    return { posts };
}

function mapDispatchToProps(dispatch) {
    return {
        savePost: (post) => {
            if (post.id) {
                return dispatch(PostActions.updatePost(post));
            }
            else {
                return dispatch(PostActions.createPost(post));
            }
        },
        deletePost: (id) => dispatch(PostActions.deletePost(id)),
        upvotePost: (id) => dispatch(PostActions.upvotePost(id)),
        downvotePost: (id) => dispatch(PostActions.downvotePost(id)),
        loadCommentsForPost: (id) => dispatch(CommentActions.loadCommentsForPost(id))
    };
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PostDetails);
