import { SELECT_COURSE, UNSELECT_COURSE } from './actionTypes';

export const selectCourse = (index) => {
    return {
        type: SELECT_COURSE,
        index
    }
}

export const unselectCourse = (index) => {
    return {
        type: UNSELECT_COURSE,
        index
    }
}