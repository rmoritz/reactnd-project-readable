import * as Api from '../utils/api';

export const LOAD_COMMENTS_FOR_POST = 'LOAD_COMMENTS_FOR_POST';

export function loadCommentsForPost(postId) {
    return (dispatch) =>
        Api.getCommentsForPost(postId)
        .then((comments) => 
            dispatch(loadCommentsForPostImpl(postId, comments)));
}

function loadCommentsForPostImpl(postId, comments) {
    return {
        type: LOAD_COMMENTS_FOR_POST,
        postId,
        comments
    };
}