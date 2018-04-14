import * as Api from '../utils/api';

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

export function loadCategories() {
    return (dispatch) =>
        Api.getAllCategories()
        .then((categories) =>
              dispatch(loadCategoriesImpl(categories)));
}

function loadCategoriesImpl(categories) {
    return {
        type: LOAD_CATEGORIES,
        categories
    };
}
