import FontAwesome from '@fortawesome/fontawesome';
import faThumbsUp from '@fortawesome/fontawesome-free-solid/faThumbsUp';
import faThumbsDown from '@fortawesome/fontawesome-free-solid/faThumbsDown';
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit';
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash';
import faPlusSquare from '@fortawesome/fontawesome-free-solid/faPlusSquare';

function loadIcons() {
    FontAwesome.library.add(
        faThumbsUp,
        faThumbsDown,
        faEdit,
        faTrash,
        faPlusSquare
    );
};

export { loadIcons };
