import {
    LOAD_POSTS,
    UPVOTE_POST,
    DOWNVOTE_POST,
    DELETE_POST,
    CREATE_POST,
    UPDATE_POST
} from '../actions/posts';

export default function posts(state = [], action) {
    switch (action.type) {
    case LOAD_POSTS:
        return action.posts;

    case CREATE_POST:
        return [
            ...state,
            action.post
        ];

    case UPDATE_POST:
    case UPVOTE_POST:
    case DOWNVOTE_POST:
        return [
            ...state.filter(x => x.id !== action.post.id),
            action.post
        ];

    case DELETE_POST:
        return state.filter(p => p.id !== action.postId);

    default:
        return state;
    }
}
