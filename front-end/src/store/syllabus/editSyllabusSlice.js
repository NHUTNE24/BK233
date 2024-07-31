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
    syllabusName: '',
    version: '',
    code: '',
    attendeeNumber: 0,
    technicalRequirement: '',
    courseObjective: '',
    trainingDeliveryPrinciple: '',
    level: '',
    trainingPrinciple: {},

    isSyllabusDaysValid: false,
    isAssessmentSchemaValid: true,
    isBasicInfoValid: false,
    isGeneralValid: false,
    isTrainingPrincipleValid: false,
};

const editSyllabusSlice = createSlice({
    name: 'editSyllabusSlice',
    initialState,
    reducers: {
        setTechnicalRequirement: (state, action) => {
            const { technicalRequirement } = action.payload;
            state.technicalRequirement = technicalRequirement;
        },

        setSyllabusDays: (state, action) => {
            state.syllabusDays = action.payload;
        },

        setLevel: (state, action) => {
            const { level } = action.payload;
            state.level = level;
        },

        setTrainingDeliveryPrinciple: (state, action) => {
            const { trainingDeliveryPrinciple } = action.payload;
            state.trainingDeliveryPrinciple = trainingDeliveryPrinciple;
        },

        setCourseObjective: (state, action) => {
            const { courseObjective } = action.payload;
            state.courseObjective = courseObjective;
        },

        setAttendeeNumber: (state, action) => {
            const { attendeeNumber } = action.payload;
            state.attendeeNumber = attendeeNumber;
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
            state.isSyllabusDaysValid = validateSyllabusDays(state.syllabusDays);
        },

        changeUnitName: (state, action) => {
            const { indexDay, indexUnit, name } = action.payload;
            if (state.syllabusDays[indexDay] && state.syllabusDays[indexDay].syllabusUnits[indexUnit]) {
                state.syllabusDays[indexDay].syllabusUnits[indexUnit].unitName = name;
            }
            state.isSyllabusDaysValid = validateSyllabusDays(state.syllabusDays);
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

        changeQuiz: (state, action) => {
            const { value } = action.payload;
            state.assessmentSchema.quiz = value;
            state.isAssessmentSchemaValid = validateAssessmentSchema(state.assessmentSchema);
        },

        changeAssignment: (state, action) => {
            const { value } = action.payload;
            state.assessmentSchema.assignment = value;
            state.isAssessmentSchemaValid = validateAssessmentSchema(state.assessmentSchema);
        },

        changeFinal: (state, action) => {
            const { value } = action.payload;
            state.assessmentSchema.final = value;
            state.isAssessmentSchemaValid = validateAssessmentSchema(state.assessmentSchema);
        },

        changeFinalTheory: (state, action) => {
            const { value } = action.payload;
            state.assessmentSchema.finalTheory = value;
            state.isAssessmentSchemaValid = validateAssessmentSchema(state.assessmentSchema);
        },

        changeFinalPractice: (state, action) => {
            const { value } = action.payload;
            state.assessmentSchema.finalPractice = value;
            state.isAssessmentSchemaValid = validateAssessmentSchema(state.assessmentSchema);
        },

        changeGpa: (state, action) => {
            const { value } = action.payload;
            state.assessmentSchema.gpa = value;
            state.isAssessmentSchemaValid = validateAssessmentSchema(state.assessmentSchema);
        },

        deleteDay: (state, action) => {
            const { indexDay } = action.payload;
            state.syllabusDays = state.syllabusDays.filter((item, index) => index !== indexDay);
        },

        changeSyllabusName: (state, action) => {
            const { name } = action.payload;
            state.syllabusName = name;
        },

        changeSyllabusVersion: (state, action) => {
            const { version } = action.payload;
            state.version = version;
        },

        changeSyllabusCode: (state, action) => {
            const { code } = action.payload;
            state.code = code;
        },

        changeAttendeeNumber: (state, action) => {
            const { attendeeNumber } = action.payload;
            state.attendeeNumber = attendeeNumber;
        },
    },
});

export const {
    updateGeneral,
    updateBasicInfo,
    updateTrainingPrinciple,
    addChapter,
    deleteChapter,
    addUnit,
    deleteUnit,
    addDay,
    deleteDay,
    changeUnitName,
    changeAttendeeNumber,
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
} = editSyllabusSlice.actions;

export default editSyllabusSlice.reducer;
