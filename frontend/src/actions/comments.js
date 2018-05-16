import * as Api from '../utils/api';

export const LOAD_COMMENTS_FOR_POST = 'LOAD_COMMENTS_FOR_POST';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const DOWNVOTE_COMMENT = 'UPVOTE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

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

export function createComment(comment) {
    return (dispatch) =>
        Api.addComment(comment)
        .then((res) =>
              dispatch(createCommentImpl(res)));
}

export function updateComment(comment) {
    return (dispatch) =>
        Api.updateComment(comment)
        .then((res) =>
              dispatch(updateCommentImpl(res)));
}

function createCommentImpl(comment) {
    return {
        type: CREATE_COMMENT,
        comment
    };
}

function updateCommentImpl(comment) {
    return {
        type: UPDATE_COMMENT,
        comment
    };
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
