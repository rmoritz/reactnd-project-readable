import {
    LOAD_POSTS,
    UPVOTE_POST,
    DOWNVOTE_POST,
    DELETE_POST
} from '../actions/posts';

export default function posts(state = [], action) {
    switch (action.type) {
    case LOAD_POSTS:
        return action.posts;

    case UPVOTE_POST: {
        const post = state.find(p => p.id === action.postId);
        if (!post) return state;
        return [
            ...state.filter(x => x.id !== action.postId),
            {
                ...post,
                voteScore: post.voteScore+1
            }
        ];
    }

    case DOWNVOTE_POST: {
        const post = state.find(p => p.id === action.postId);
        if (!post) return state;
        return [
            ...state.filter(x => x.id !== action.postId),
            {
                ...post,
                voteScore: post.voteScore-1
            }
        ];
    }

    case DELETE_POST: {
        return state.filter(p => p.id !== action.postId);
    }

    default:
        return state;
    }
}
