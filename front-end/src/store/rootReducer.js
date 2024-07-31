import { combineReducers } from '@reduxjs/toolkit';

import createSyllabusReducer from './syllabus/createSyllabusSlice';
import siderBarReducer from './app/siderBarSlice';
import updateSyllabusReducer from './syllabus/updateSyllabusSlice';
import syllabusDetailReducer from './syllabus/syllabusDetailSlice';
import viewSyllabusReducer from './syllabus/viewSyllabusSlice';
import authReducer from './slices/authSlice'; // Adjust the path as necessary

const rootReducer = combineReducers({
    sideBar: siderBarReducer,
    createSyllabus: createSyllabusReducer,
    updateSyllabus: updateSyllabusReducer,
    syllabusDetail: syllabusDetailReducer,
    viewSyllabus: viewSyllabusReducer,
    auth: authReducer,

});

export default rootReducer;
