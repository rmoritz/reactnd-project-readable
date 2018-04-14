import FontAwesome from '@fortawesome/fontawesome';
import faThumbsUp from '@fortawesome/fontawesome-free-solid/faThumbsUp';
import faThumbsDown from '@fortawesome/fontawesome-free-solid/faThumbsDown';
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit';
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash';

function loadIcons() {
    FontAwesome.library.add(faThumbsUp, faThumbsDown, faEdit, faTrash);
};

export { loadIcons };
