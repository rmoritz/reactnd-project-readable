import { LOAD_POSTS } from '../actions/posts';

function posts(state = {}, action) {
    switch (action.type) {
    case LOAD_POSTS:
        return {
            ...state,
            posts: action.posts
        };
    default:
        return state;
    }
}

export default posts;
