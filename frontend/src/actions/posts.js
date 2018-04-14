import * as Api from '../utils/api';

export const LOAD_POSTS = 'LOAD_POSTS';

export function loadPosts() {
    return (dispatch) =>
        Api.getAllPosts()
        .then((posts) =>
              dispatch(loadPostsImpl(posts)));
}

function loadPostsImpl(posts) {
    return {
        type: LOAD_POSTS,
        posts
    };
}
