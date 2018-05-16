import * as Api from '../utils/api';

export const LOAD_COMMENTS_FOR_POST = 'LOAD_COMMENTS_FOR_POST';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const DOWNVOTE_COMMENT = 'UPVOTE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export function loadCommentsForPost(postId) {
    return (dispatch) =>
        Api.getCommentsForPost(postId)
        .then((comments) => 
            dispatch(loadCommentsForPostImpl(postId, comments)));
}

export function upvoteComment(id) {
    return (dispatch) =>
        Api.upVoteComment(id)
        .then((res) =>
              dispatch(upvoteCommentImpl(res)));
}

export function downvoteComment(id) {
    return (dispatch) =>
        Api.downVoteComment(id)
        .then((res) =>
              dispatch(downvoteCommentImpl(res)));
}

export function deleteComment(id) {
    return (dispatch) =>
        Api.deleteComment(id)
        .then(() =>
              dispatch(deleteCommentImpl(id)));
}

function deleteCommentImpl(commentId) {
    return {
        type: DELETE_COMMENT,
        commentId
    };
}

function upvoteCommentImpl(comment) {
    return {
        type: UPVOTE_COMMENT,
        comment
    };
}

function downvoteCommentImpl(comment) {
    return {
        type: DOWNVOTE_COMMENT,
        comment
    };
}

function loadCommentsForPostImpl(postId, comments) {
    return {
        type: LOAD_COMMENTS_FOR_POST,
        postId,
        comments
    };
}
