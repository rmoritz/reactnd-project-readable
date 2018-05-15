import FontAwesome from '@fortawesome/fontawesome';
import faThumbsUp from '@fortawesome/fontawesome-free-solid/faThumbsUp';
import faThumbsDown from '@fortawesome/fontawesome-free-solid/faThumbsDown';
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit';
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash';
import faPlusSquare from '@fortawesome/fontawesome-free-solid/faPlusSquare';
import faSortUp from '@fortawesome/fontawesome-free-solid/faSortUp';
import faSortDown from '@fortawesome/fontawesome-free-solid/faSortDown';
import faComments from '@fortawesome/fontawesome-free-solid/faComments';
import faStar from '@fortawesome/fontawesome-free-solid/faStar';

export function loadIcons() {
    FontAwesome.library.add(
        faThumbsUp,
        faThumbsDown,
        faEdit,
        faTrash,
        faPlusSquare,
        faSortUp,
        faSortDown,
        faComments,
        faStar
    );
};
