import { LOAD_COMMENTS_FOR_POST } from '../actions/comments';

export default function comments(state = [], action) {
    switch (action.type) {
    case LOAD_COMMENTS_FOR_POST:
        return [
            ...state.filter(x => x.parentId !== action.postId),
            ...action.comments
        ];

    default:
        return state;
    }
}
