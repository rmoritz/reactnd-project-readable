////////// CATEGORIES

export function getAllCategories() {
    return fetchPart('categories');
}

////////// POSTS

export function getAllPosts() {
    return fetchPart('posts');
}

export function getPostById(id) {
    return fetchPart(`posts/${id}`);
}

export function getPostsInCategory(categoryId) {
    return fetchPart(`${categoryId}/posts`);
}

export function addPost(post) {
    return postPart('posts', post);
}

export function upVotePost(id) {
    return postPart(`posts/${id}`, {
        option: 'upVote'
    });
}

export function downVotePost(id) {
    return postPart(`posts/${id}`, {
        option: 'downVote'
    });
}

export function updatePost(post) {
    return putPart(`posts/${post.id}`, post);
}

export function deletePost(id) {
    return deletePart(`posts/${id}`);
}

////////// COMMENTS

export function getCommentsForPost(postId) {
    return fetchPart(`posts/${postId}/comments`);
}

export function addComment(comment) {
    return postPart('comments', comment);
}

export function updateComment(comment) {
    return putPart(`comments/${comment.id}`, comment);
}

export function getCommentById(id) {
    return fetchPart(`comments/${id}`);
}

export function upVoteComment(id) {
    return postPart(`comments/${id}`, {
        option: 'upVote'
    });
}

export function downVoteComment(id) {
    return postPart(`comments/${id}`, {
        option: 'downVote'
    });
}

export function deleteComment(id) {
    return deletePart(`comments/${id}`);
}

////////// IMPLEMENTATION DETAILS

const baseUri = 'http://localhost:3001';
const token = localStorage.token
      || localStorage.token = Math.random().toString(36).substr(-8);
const headers = {
  'Accept': 'application/json',
  'Authorization': token
};

function fetchPart(uriPart) {
    return fetch(`${baseUri}/${uriPart}`, {
        headers: headers
    });
}

function postPart(uriPart, data) {
    return fetch(`${baseUri}/${uriPart}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
    });
}

function putPart(uriPart, data) {
    return fetch(`${baseUri}/${uriPart}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
    });
}

function deletePart(uriPart) {
    return fetch(`${baseUri}/${uriPart}`, {
        method: 'DELETE',
        headers
    });
}
