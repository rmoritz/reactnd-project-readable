////////// CATEGORIES

export function getAllCategories() {
    return getPart('categories')
        .then(res => res.categories);
}

////////// POSTS

export function getAllPosts() {
    return getPart('posts');
}

export function getPostById(id) {
    return getPart(`posts/${id}`);
}

export function getPostsInCategory(categoryId) {
    return getPart(`${categoryId}/posts`);
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
    return getPart(`posts/${postId}/comments`);
}

export function addComment(comment) {
    return postPart('comments', comment);
}

export function updateComment(comment) {
    return putPart(`comments/${comment.id}`, comment);
}

export function getCommentById(id) {
    return getPart(`comments/${id}`);
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
if (!localStorage.token) {
    localStorage.token = Math.random().toString(36).substr(-8);
}
const token = localStorage.token;
const headers = {
  'Accept': 'application/json',
  'Authorization': token
};

function getPart(uriPart) {
    return fetch(`${baseUri}/${uriPart}`, {
        headers: headers
    }).then(res => res.json());
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
