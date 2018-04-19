import * as Api from '../utils/api';

export const LOAD_POSTS = 'LOAD_POSTS';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const DELETE_POST = 'DELETE_POST';
export const CREATE_POST = 'CREATE_POST';
export const UPDATE_POST = 'UPDATE_POST';

export function loadPosts() {
    return (dispatch) =>
        Api.getAllPosts()
        .then((posts) =>
              dispatch(loadPostsImpl(posts)));
}

export function upvotePost(id) {
    return (dispatch) =>
        Api.upVotePost(id)
        .then((res) =>
              dispatch(upvotePostImpl(res)));
}

export function downvotePost(id) {
    return (dispatch) =>
        Api.downVotePost(id)
        .then((res) =>
              dispatch(downvotePostImpl(res)));
}

export function deletePost(id) {
    return (dispatch) =>
        Api.deletePost(id)
        .then(() =>
              dispatch(deletePostImpl(id)));
}

export function createPost(post) {
    return (dispatch) =>
        Api.addPost(post)
        .then((res) =>
              dispatch(createPostImpl(res)));
}

export function updatePost(post) {
    return (dispatch) =>
        Api.updatePost(post)
        .then((res) =>
              dispatch(updatePostImpl(res)));
}

function createPostImpl(post) {
    return {
        type: CREATE_POST,
        post
    };
}

function updatePostImpl(post) {
    return {
        type: UPDATE_POST,
        post
    };
}

function deletePostImpl(postId) {
    return {
        type: DELETE_POST,
        postId
    };
}

function downvotePostImpl(post) {
    return {
        type: DOWNVOTE_POST,
        post
    };
}

function upvotePostImpl(post) {
    return {
        type: UPVOTE_POST,
        post
    };
}

function loadPostsImpl(posts) {
    return {
        type: LOAD_POSTS,
        posts
    };
}
