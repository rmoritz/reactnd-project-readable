import {
    LOAD_COMMENTS_FOR_POST,
    UPVOTE_COMMENT,
    DOWNVOTE_COMMENT,
    DELETE_COMMENT
} from '../actions/comments';

export default function comments(state = [], action) {
    switch (action.type) {
    case LOAD_COMMENTS_FOR_POST:
        return [
            ...state.filter(x => x.parentId !== action.postId),
            ...action.comments
        ];

    case UPVOTE_COMMENT:
    case DOWNVOTE_COMMENT:
        return [
            ...state.filter(x => x.id !== action.comment.id),
            action.comment
        ];

    case DELETE_COMMENT:
        return state.filter(x => x.id !== action.commentId);

    default:
        return state;
    }
}
