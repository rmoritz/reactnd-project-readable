import * as Api from '../utils/api';

export const LOAD_POSTS = 'LOAD_POSTS';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const DELETE_POST = 'DELETE_POST';

export function loadPosts() {
    return (dispatch) =>
        Api.getAllPosts()
        .then((posts) =>
              dispatch(loadPostsImpl(posts)));
}

export function upvotePost(id) {
    return (dispatch) =>
        Api.upVotePost(id)
        .then(() =>
              dispatch(upvotePostImpl(id)));
}

export function downvotePost(id) {
    return (dispatch) =>
        Api.downVotePost(id)
        .then(() =>
              dispatch(downvotePostImpl(id)));
}

export function deletePost(id) {
    return (dispatch) =>
        Api.deletePost(id)
        .then(() =>
              dispatch(deletePostImpl(id)));
}

function deletePostImpl(postId) {
    return {
        type: DELETE_POST,
        postId
    };
}

function downvotePostImpl(postId) {
    return {
        type: DOWNVOTE_POST,
        postId
    };
}

function upvotePostImpl(postId) {
    return {
        type: UPVOTE_POST,
        postId
    };
}

function loadPostsImpl(posts) {
    return {
        type: LOAD_POSTS,
        posts
    };
}
