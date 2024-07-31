import { createSlice } from '@reduxjs/toolkit';
import {
    validateAssessmentSchema,
    validateBasicInfo,
    validateGeneral,
    validateSyllabusDays,
    validateTrainingPrinciple,
} from './validateCreateSyllabus';

const initialState = {
    syllabusDays: [],
    assessmentSchema: {
        quiz: 10,
        assignment: 30,
        final: 60,
        finalTheory: 50,
        finalPractice: 50,
        gpa: 3,
    },
    basicInfo: {},
    general: {},
    trainingPrinciple: {},

    isSyllabusDaysValid: false,
    isAssessmentSchemaValid: {
        status: true,
        errorSection: [],
    },
    isBasicInfoValid: false,
    isGeneralValid: false,
    isTrainingPrincipleValid: false,
    status: 'draft',
};

const createSyllabusSlice = createSlice({
    name: 'createSyllabus',
    initialState,
    reducers: {
        updateBasicInfo: (state, action) => {
            state.basicInfo = action.payload;
            state.isBasicInfoValid = validateBasicInfo(action.payload);
        },
        updateGeneral: (state, action) => {
            state.general = { ...state.general, ...action.payload };
            state.isGeneralValid = validateGeneral(action.payload);
        },

        updateTrainingPrinciple(state, action) {
            state.trainingPrinciple = action.payload;
            state.isTrainingPrincipleValid = validateTrainingPrinciple(action.payload);
        },

        addChapter: (state, action) => {
            const { indexDay, indexUnit } = action.payload;
            if (state.syllabusDays[indexDay] && state.syllabusDays[indexDay].syllabusUnits[indexUnit]) {
                state.syllabusDays[indexDay].syllabusUnits[indexUnit].unitChapters.push({
                    chapterName: '',
                    duration: 0,
                    isOnline: false,
                    deliveryType: '',
                    outputStandard: '',
                });
            }
        },

        changeUnitName: (state, action) => {
            const { indexDay, indexUnit, name } = action.payload;
            if (state.syllabusDays[indexDay] && state.syllabusDays[indexDay].syllabusUnits[indexUnit]) {
                state.syllabusDays[indexDay].syllabusUnits[indexUnit].unitName = name;
            }
        },

        changeOutputStandard: (state, action) => {
            const { indexDay, indexUnit, indexChapter, outputStandard } = action.payload;
            if (
                state.syllabusDays[indexDay] &&
                state.syllabusDays[indexDay].syllabusUnits[indexUnit] &&
                state.syllabusDays[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter]
            ) {
                state.syllabusDays[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter].outputStandard =
                    outputStandard;
            }
        },

        changeChapterName: (state, action) => {
            const { indexDay, indexUnit, indexChapter, name } = action.payload;
            if (
                state.syllabusDays[indexDay] &&
                state.syllabusDays[indexDay].syllabusUnits[indexUnit] &&
                state.syllabusDays[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter]
            ) {
                state.syllabusDays[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter].chapterName = name;
            }
        },

        changeDeliveryType: (state, action) => {
            const { indexDay, indexUnit, indexChapter, deliveryType } = action.payload;
            if (
                state.syllabusDays[indexDay] &&
                state.syllabusDays[indexDay].syllabusUnits[indexUnit] &&
                state.syllabusDays[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter]
            ) {
                state.syllabusDays[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter].deliveryType =
                    deliveryType;
            }
        },

        changeDuration: (state, action) => {
            const { indexDay, indexUnit, indexChapter, duration } = action.payload;
            if (
                state.syllabusDays[indexDay] &&
                state.syllabusDays[indexDay].syllabusUnits[indexUnit] &&
                state.syllabusDays[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter]
            ) {
                state.syllabusDays[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter].duration = duration;
            }
        },

        changeMethod: (state, action) => {
            const { indexDay, indexUnit, indexChapter, isOnline } = action.payload;
            if (
                state.syllabusDays[indexDay] &&
                state.syllabusDays[indexDay].syllabusUnits[indexUnit] &&
                state.syllabusDays[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter]
            ) {
                state.syllabusDays[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter].isOnline = isOnline;
            }
        },

        deleteChapter: (state, action) => {
            const { indexDay, indexUnit, indexChapter } = action.payload;
            if (state.syllabusDays[indexDay] && state.syllabusDays[indexDay].syllabusUnits[indexUnit]) {
                state.syllabusDays[indexDay].syllabusUnits[indexUnit].unitChapters = state.syllabusDays[
                    indexDay
                ].syllabusUnits[indexUnit].unitChapters.filter((item, index) => index !== indexChapter);
            }
        },

        addUnit: (state, action) => {
            const { indexDay } = action.payload;
            const newUnit = {
                unitName: '',
                unitChapters: [],
            };
            if (state.syllabusDays[indexDay]) {
                if (!state.syllabusDays[indexDay].syllabusUnits) {
                    state.syllabusDays[indexDay].syllabusUnits = [];
                }
                state.syllabusDays[indexDay].syllabusUnits.push(newUnit);
            }
        },

        deleteUnit: (state, action) => {
            const { indexDay, indexUnit } = action.payload;
            if (state.syllabusDays[indexDay]) {
                state.syllabusDays[indexDay].syllabusUnits = state.syllabusDays[indexDay].syllabusUnits.filter(
                    (item, index) => index !== indexUnit,
                );
            }
        },

        addDay: (state) => {
            state.syllabusDays.push({
                syllabusUnits: [],
            });
        },

        deleteDay: (state, action) => {
            const { indexDay } = action.payload;
            state.syllabusDays = state.syllabusDays.filter((item, index) => index !== indexDay);
        },

        changeQuiz: (state, action) => {
            const { value } = action.payload;
            state.assessmentSchema.quiz = value;
            const errorSection = [...state.isAssessmentSchemaValid.errorSection];

            state.isAssessmentSchemaValid = validateAssessmentSchema(errorSection, state.assessmentSchema);
        },

        changeAssignment: (state, action) => {
            const { value } = action.payload;
            state.assessmentSchema.assignment = value;
            const errorSection = [...state.isAssessmentSchemaValid.errorSection];

            state.isAssessmentSchemaValid = validateAssessmentSchema(errorSection, state.assessmentSchema);
        },

        changeFinal: (state, action) => {
            const { value } = action.payload;
            state.assessmentSchema.final = value;

            const errorSection = [...state.isAssessmentSchemaValid.errorSection];

            state.isAssessmentSchemaValid = validateAssessmentSchema(errorSection, state.assessmentSchema);
        },

        changeFinalTheory: (state, action) => {
            const { value } = action.payload;
            state.assessmentSchema.finalTheory = value;
            const errorSection = [...state.isAssessmentSchemaValid.errorSection];
            state.isAssessmentSchemaValid = validateAssessmentSchema(errorSection, state.assessmentSchema);
        },

        changeFinalPractice: (state, action) => {
            const { value } = action.payload;
            state.assessmentSchema.finalPractice = value;
            const errorSection = [...state.isAssessmentSchemaValid.errorSection];
            state.isAssessmentSchemaValid = validateAssessmentSchema(errorSection, state.assessmentSchema);
        },

        changeGpa: (state, action) => {
            const { value } = action.payload;
            state.assessmentSchema.gpa = value;
            const errorSection = [...state.isAssessmentSchemaValid.errorSection];
            state.isAssessmentSchemaValid = validateAssessmentSchema(errorSection, state.assessmentSchema);
        },
    },
});

export const {
    updateBasicInfo,
    updateGeneral,

    addDay,
    deleteDay,
    addChapter,
    deleteChapter,
    addUnit,
    deleteUnit,
    changeUnitName,
    changeChapterName,
    changeOutputStandard,
    changeDeliveryType,
    changeDuration,
    changeMethod,

    changeQuiz,
    changeAssignment,
    changeFinal,
    changeFinalPractice,
    changeFinalTheory,
    changeGpa,

    updateTrainingPrinciple,
} = createSyllabusSlice.actions;

export default createSyllabusSlice.reducer;
