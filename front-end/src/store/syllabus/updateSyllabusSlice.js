import { createSlice } from '@reduxjs/toolkit';
import {
    validateAssessmentSchema,
    validateBasicInfo,
    validateGeneral,
    validateTrainingPrinciple,
} from './validateCreateSyllabus';

const initialState = {
    syllabusDay: [],
    assignmentSchema: {
        quiz: 10,
        assignment: 30,
        finalAssessment: 60,
        finalTheory: 50,
        finalPractice: 50,
        gpa: 3,
    },
    basicInfo: {
        syllabusName: '',
        version: '',
        code: '',
    },
    general: {
        level: '',
        technicalContent: '',
        courseContent: '',
        attendeeNumber: null,
    },
    trainingPrinciple: {
        training: '',
        pretest: '',
        marking: '',
        waiverCriteria: '',
        others: '',
    },
    isSyllabusDaysValid: true,
    isAssessmentSchemaValid: {
        status: true,
        errorSection: [],
    },
    isBasicInfoValid: false,
    isGeneralValid: {
        status: false,
        errorSection: [],
    },
    isTrainingPrincipleValid: true,
    status: 'Draft',
};

const updateSyllabusSlice = createSlice({
    name: 'updateSyllabus',
    initialState,
    reducers: {
        resetState: (state) => {
            return initialState;
        },
        updateBasicInfo: (state, action) => {
            state.basicInfo = action.payload;
            state.isBasicInfoValid = validateBasicInfo(action.payload);
        },
        updateGeneral: (state, action) => {
            state.general = { ...state.general, ...action.payload };
            state.isGeneralValid.status = validateGeneral(action.payload);
        },

        updateGeneralIsValid: (state, action) => {
            state.isGeneralValid = action.payload;
        },

        updateTrainingPrinciple(state, action) {
            state.trainingPrinciple = action.payload;
            state.isTrainingPrincipleValid = validateTrainingPrinciple(action.payload);
        },

        setTechnicalRequirement: (state, action) => {
            const { technicalRequirement } = action.payload;
            state.general.technicalContent = technicalRequirement;
            if (
                state.general.technicalContent !== '<p><br></p>' &&
                state.general.courseContent !== '<p><br></p>' &&
                state.general.attendeeNumber
            ) {
                state.isGeneralValid.status = true;
            } else {
                state.isGeneralValid.status = false;
            }
            state.isGeneralValid.errorSection = state.isGeneralValid.errorSection.filter(
                (item) => item !== 'technical',
            );
        },

        setStatus: (state, action) => {
            const { status } = action.payload;

            state.status = status;
        },

        setSyllabusDays: (state, action) => {
            state.syllabusDay = action.payload;
            let isValid = true;

            state.syllabusDay.forEach((day) => {
                day.syllabusUnits.forEach((unit) => {
                    if (!unit.unitName) {
                        state.isSyllabusDaysValid = false;

                        isValid = false;

                        return;
                    }

                    unit.unitChapters.forEach((chapter) => {
                        if (
                            !chapter.name ||
                            !chapter.duration ||
                            !chapter.deliveryTypeId ||
                            !chapter.outputStandardId
                        ) {
                            state.isSyllabusDaysValid = false;

                            isValid = false;

                            return;
                        }
                    });
                });
            });

            if (isValid) {
                state.isSyllabusDaysValid = true;
            } else {
                state.isSyllabusDaysValid = false;
            }
        },

        setLevel: (state, action) => {
            const { level } = action.payload;
            state.general.level = level;
            if (state.general.technicalContent && state.general.courseContent && state.general.attendeeNumber) {
                state.isGeneralValid.status = true;
            } else {
                state.isGeneralValid.status = false;
            }
        },

        setTrainingDeliveryPrinciple: (state, action) => {
            const { training, pretest, marking, waiverCriteria, others } = action.payload;
            state.trainingPrinciple.training = training;
            state.trainingPrinciple.pretest = pretest;
            state.trainingPrinciple.marking = marking;
            state.trainingPrinciple.waiverCriteria = waiverCriteria;
            state.trainingPrinciple.others = others;
            if (training && pretest && marking && others && waiverCriteria) {
                state.isTrainingPrincipleValid = true;
            } else {
                state.isTrainingPrincipleValid = false;
            }
        },

        setCourseObjective: (state, action) => {
            const { courseObjective } = action.payload;
            state.general.courseContent = courseObjective;
            if (
                state.general.technicalContent !== '<p><br></p>' &&
                state.general.courseContent !== '<p><br></p>' &&
                state.general.attendeeNumber
            ) {
                state.isGeneralValid.status = true;
            } else {
                state.isGeneralValid.status = false;
            }

            state.isGeneralValid.errorSection = state.isGeneralValid.errorSection.filter(
                (item) => item !== 'course-objective',
            );
        },

        setAttendeeNumber: (state, action) => {
            const { attendeeNumber } = action.payload;
            state.general.attendeeNumber = attendeeNumber;
            if (
                state.general.technicalContent !== '<p><br></p>' &&
                state.general.courseContent !== '<p><br></p>' &&
                state.general.attendeeNumber
            ) {
                state.isGeneralValid.status = true;
            } else {
                state.isGeneralValid.status = false;
            }
            state.isGeneralValid.errorSection = state.isGeneralValid.errorSection.filter(
                (item) => item !== 'attendee-number',
            );
        },

        addChapter: (state, action) => {
            const { indexDay, indexUnit } = action.payload;
            if (state.syllabusDay[indexDay] && state.syllabusDay[indexDay].syllabusUnits[indexUnit]) {
                state.syllabusDay[indexDay].syllabusUnits[indexUnit].unitChapters.push({
                    name: '',
                    id: null,
                    duration: 0,
                    isOnline: false,
                    deliveryTypeId: '',
                    outputStandardId: '',
                });
            }
            let isValid = true;
            state.syllabusDay.forEach((day) => {
                day.syllabusUnits.forEach((unit) => {
                    if (!unit.unitName) {
                        state.isSyllabusDaysValid = false;
                        isValid = false;
                        return;
                    }
                    unit.unitChapters.forEach((chapter) => {
                        if (
                            !chapter.name ||
                            !chapter.duration ||
                            !chapter.deliveryTypeId ||
                            !chapter.outputStandardId
                        ) {
                            state.isSyllabusDaysValid = false;
                            isValid = false;
                            return;
                        }
                    });
                });
            });
            if (isValid) {
                state.isSyllabusDaysValid = true;
            }
        },

        changeUnitName: (state, action) => {
            const { indexDay, indexUnit, name } = action.payload;
            if (state.syllabusDay[indexDay] && state.syllabusDay[indexDay].syllabusUnits[indexUnit]) {
                state.syllabusDay[indexDay].syllabusUnits[indexUnit].unitName = name;
            }
            let isValid = true;
            state.syllabusDay.forEach((day) => {
                day.syllabusUnits.forEach((unit) => {
                    if (!unit.unitName) {
                        state.isSyllabusDaysValid = false;
                        isValid = false;
                        return;
                    }
                    unit.unitChapters.forEach((chapter) => {
                        if (
                            !chapter.name ||
                            !chapter.duration ||
                            !chapter.deliveryTypeId ||
                            !chapter.outputStandardId
                        ) {
                            state.isSyllabusDaysValid = false;
                            isValid = false;
                            return;
                        }
                    });
                });
            });
            if (isValid) {
                state.isSyllabusDaysValid = true;
            }
        },

        changeOutputStandard: (state, action) => {
            const { indexDay, indexUnit, indexChapter, outputStandard } = action.payload;
            if (
                state.syllabusDay[indexDay] &&
                state.syllabusDay[indexDay].syllabusUnits[indexUnit] &&
                state.syllabusDay[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter]
            ) {
                state.syllabusDay[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter].outputStandardId =
                    outputStandard;
            }
            let isValid = true;
            state.syllabusDay.forEach((day) => {
                day.syllabusUnits.forEach((unit) => {
                    if (!unit.unitName) {
                        state.isSyllabusDaysValid = false;
                        isValid = false;
                        return;
                    }
                    unit.unitChapters.forEach((chapter) => {
                        if (
                            !chapter.name ||
                            !chapter.duration ||
                            !chapter.deliveryTypeId ||
                            !chapter.outputStandardId
                        ) {
                            state.isSyllabusDaysValid = false;
                            isValid = false;
                            return;
                        }
                    });
                });
            });
            if (isValid) {
                state.isSyllabusDaysValid = true;
            }
        },

        changeChapterName: (state, action) => {
            const { indexDay, indexUnit, indexChapter, name } = action.payload;
            if (
                state.syllabusDay[indexDay] &&
                state.syllabusDay[indexDay].syllabusUnits[indexUnit] &&
                state.syllabusDay[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter]
            ) {
                state.syllabusDay[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter].name = name;
            }
            let isValid = true;
            state.syllabusDay.forEach((day) => {
                day.syllabusUnits.forEach((unit) => {
                    if (!unit.unitName) {
                        state.isSyllabusDaysValid = false;
                        isValid = false;
                        return;
                    }
                    unit.unitChapters.forEach((chapter) => {
                        if (
                            !chapter.name ||
                            !chapter.duration ||
                            !chapter.deliveryTypeId ||
                            !chapter.outputStandardId
                        ) {
                            state.isSyllabusDaysValid = false;
                            isValid = false;
                            return;
                        }
                    });
                });
            });
            if (isValid) {
                state.isSyllabusDaysValid = true;
            }
        },

        changeDeliveryType: (state, action) => {
            const { indexDay, indexUnit, indexChapter, deliveryType } = action.payload;
            if (
                state.syllabusDay[indexDay] &&
                state.syllabusDay[indexDay].syllabusUnits[indexUnit] &&
                state.syllabusDay[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter]
            ) {
                state.syllabusDay[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter].deliveryTypeId =
                    deliveryType;
            }
            let isValid = true;
            state.syllabusDay.forEach((day) => {
                day.syllabusUnits.forEach((unit) => {
                    if (!unit.unitName) {
                        state.isSyllabusDaysValid = false;
                        isValid = false;
                        return;
                    }
                    unit.unitChapters.forEach((chapter) => {
                        if (
                            !chapter.name ||
                            !chapter.duration ||
                            !chapter.deliveryTypeId ||
                            !chapter.outputStandardId
                        ) {
                            state.isSyllabusDaysValid = false;
                            isValid = false;
                            return;
                        }
                    });
                });
            });
            if (isValid) {
                state.isSyllabusDaysValid = true;
            }
        },

        changeDuration: (state, action) => {
            const { indexDay, indexUnit, indexChapter, duration } = action.payload;
            if (
                state.syllabusDay[indexDay] &&
                state.syllabusDay[indexDay].syllabusUnits[indexUnit] &&
                state.syllabusDay[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter]
            ) {
                state.syllabusDay[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter].duration = duration;
            }

            let isValid = true;
            state.syllabusDay.forEach((day) => {
                day.syllabusUnits.forEach((unit) => {
                    if (!unit.unitName) {
                        state.isSyllabusDaysValid = false;
                        isValid = false;
                        return;
                    }
                    unit.unitChapters.forEach((chapter) => {
                        if (
                            !chapter.name ||
                            !chapter.duration ||
                            !chapter.deliveryTypeId ||
                            !chapter.outputStandardId
                        ) {
                            state.isSyllabusDaysValid = false;
                            isValid = false;
                            return;
                        }
                    });
                });
            });
            if (isValid) {
                state.isSyllabusDaysValid = true;
            }
        },

        changeMethod: (state, action) => {
            const { indexDay, indexUnit, indexChapter, isOnline } = action.payload;
            if (
                state.syllabusDay[indexDay] &&
                state.syllabusDay[indexDay].syllabusUnits[indexUnit] &&
                state.syllabusDay[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter]
            ) {
                state.syllabusDay[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter].isOnline = isOnline;
            }
        },

        deleteChapter: (state, action) => {
            const { indexDay, indexUnit, indexChapter } = action.payload;
            if (state.syllabusDay[indexDay] && state.syllabusDay[indexDay].syllabusUnits[indexUnit]) {
                state.syllabusDay[indexDay].syllabusUnits[indexUnit].unitChapters = state.syllabusDay[
                    indexDay
                ].syllabusUnits[indexUnit].unitChapters.filter((item, index) => index !== indexChapter);
            }
            let isValid = true;
            state.syllabusDay.forEach((day) => {
                day.syllabusUnits.forEach((unit) => {
                    if (!unit.unitName) {
                        state.isSyllabusDaysValid = false;
                        isValid = false;
                        return;
                    }
                    unit.unitChapters.forEach((chapter) => {
                        if (
                            !chapter.name ||
                            !chapter.duration ||
                            !chapter.deliveryTypeId ||
                            !chapter.outputStandardId
                        ) {
                            state.isSyllabusDaysValid = false;
                            isValid = false;
                            return;
                        }
                    });
                });
            });
            if (isValid) {
                state.isSyllabusDaysValid = true;
            }
        },

        addUnit: (state, action) => {
            const { indexDay } = action.payload;
            const newUnit = {
                unitName: '',
                unitId: null,
                unitChapters: [],
            };
            if (state.syllabusDay[indexDay]) {
                if (!state.syllabusDay[indexDay].syllabusUnits) {
                    state.syllabusDay[indexDay].syllabusUnits = [];
                }
                state.syllabusDay[indexDay].syllabusUnits.push(newUnit);
            }
            let isValid = true;
            state.syllabusDay.forEach((day) => {
                day.syllabusUnits.forEach((unit) => {
                    if (!unit.unitName) {
                        state.isSyllabusDaysValid = false;
                        isValid = false;
                        return;
                    }
                    unit.unitChapters.forEach((chapter) => {
                        if (
                            !chapter.name ||
                            !chapter.duration ||
                            !chapter.deliveryTypeId ||
                            !chapter.outputStandardId
                        ) {
                            state.isSyllabusDaysValid = false;
                            isValid = false;
                            return;
                        }
                    });
                });
            });
            if (isValid) {
                state.isSyllabusDaysValid = true;
            }
        },

        deleteUnit: (state, action) => {
            const { indexDay, indexUnit } = action.payload;
            if (state.syllabusDay[indexDay]) {
                state.syllabusDay[indexDay].syllabusUnits = state.syllabusDay[indexDay].syllabusUnits.filter(
                    (item, index) => index !== indexUnit,
                );
            }
        },

        addDay: (state) => {
            state.syllabusDay.push({
                syllabusUnits: [],
                dayId: null,
            });
            let isValid = true;

            state.syllabusDay.forEach((day) => {
                day.syllabusUnits.forEach((unit) => {
                    if (!unit.unitName) {
                        state.isSyllabusDaysValid = false;

                        isValid = false;

                        return;
                    }

                    unit.unitChapters.forEach((chapter) => {
                        if (
                            !chapter.name ||
                            !chapter.duration ||
                            !chapter.deliveryTypeId ||
                            !chapter.outputStandardId
                        ) {
                            state.isSyllabusDaysValid = false;

                            isValid = false;

                            return;
                        }
                    });
                });
            });

            if (isValid) {
                state.isSyllabusDaysValid = true;
            }
        },

        setDayId: (state, action) => {
            const { dayId, indexDay } = action.payload;
            state.syllabusDay[indexDay].dayId = dayId;
        },

        setUnitId: (state, action) => {
            const { unitId, indexDay, indexUnit } = action.payload;
            state.syllabusDay[indexDay].syllabusUnits[indexUnit].unitId = unitId;
        },
        setChapterId: (state, action) => {
            const { chapterId, indexDay, indexUnit, indexChapter } = action.payload;
            state.syllabusDay[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter].id = chapterId;
        },

        deleteDay: (state, action) => {
            const { indexDay } = action.payload;
            state.syllabusDay = state.syllabusDay.filter((item, index) => index !== indexDay);
        },

        changeQuiz: (state, action) => {
            const { value } = action.payload;
            state.assignmentSchema.quiz = value;
            const errorSection = [...state.isAssessmentSchemaValid.errorSection];

            state.isAssessmentSchemaValid = validateAssessmentSchema(errorSection, state.assignmentSchema);
        },

        changeAssignment: (state, action) => {
            const { value } = action.payload;
            state.assignmentSchema.assignment = value;
            const errorSection = [...state.isAssessmentSchemaValid.errorSection];

            state.isAssessmentSchemaValid = validateAssessmentSchema(errorSection, state.assignmentSchema);
        },

        changeFinal: (state, action) => {
            const { value } = action.payload;
            state.assignmentSchema.finalAssessment = value;

            const errorSection = [...state.isAssessmentSchemaValid.errorSection];

            state.isAssessmentSchemaValid = validateAssessmentSchema(errorSection, state.assignmentSchema);
        },

        changeFinalTheory: (state, action) => {
            const { value } = action.payload;
            state.assignmentSchema.finalTheory = value;
            const errorSection = [...state.isAssessmentSchemaValid.errorSection];
            state.isAssessmentSchemaValid = validateAssessmentSchema(errorSection, state.assignmentSchema);
        },

        changeFinalPractice: (state, action) => {
            const { value } = action.payload;
            state.assignmentSchema.finalPractice = value;
            const errorSection = [...state.isAssessmentSchemaValid.errorSection];
            state.isAssessmentSchemaValid = validateAssessmentSchema(errorSection, state.assignmentSchema);
        },

        changeGpa: (state, action) => {
            const { value } = action.payload;
            state.assignmentSchema.gpa = value;
            const errorSection = [...state.isAssessmentSchemaValid.errorSection];
            state.isAssessmentSchemaValid = validateAssessmentSchema(errorSection, state.assignmentSchema);
        },

        changeSyllabusName: (state, action) => {
            const { name } = action.payload;
            state.basicInfo.syllabusName = name;
            if (state.basicInfo.syllabusName && state.basicInfo.version && state.basicInfo.code) {
                state.isBasicInfoValid = true;
            } else {
                state.isBasicInfoValid = false;
            }
        },

        changeSyllabusVersion: (state, action) => {
            const { version } = action.payload;
            state.basicInfo.version = version;
            if (state.basicInfo.syllabusName && state.basicInfo.version && state.basicInfo.code) {
                state.isBasicInfoValid = true;
            } else {
                state.isBasicInfoValid = false;
            }
        },

        changeSyllabusCode: (state, action) => {
            const { code } = action.payload;
            state.basicInfo.code = code;
            if (state.basicInfo.syllabusName && state.basicInfo.version && state.basicInfo.code) {
                state.isBasicInfoValid = true;
            } else {
                state.isBasicInfoValid = false;
            }
        },

        changeAttendeeNumber: (state, action) => {
            const { attendeeNumber } = action.payload;
            state.general.attendeeNumber = attendeeNumber;
            if (state.general.technicalContent && state.general.courseContent && state.general.attendeeNumber) {
                state.isGeneralValid = true;
            } else {
                state.isGeneralValid = false;
            }
            state.isGeneralValid.errorSection = state.isGeneralValid.errorSection.filter(
                (item) => item !== 'attendee-number',
            );
        },
    },
});

export const {
    updateBasicInfo,
    updateGeneral,
    updateGeneralIsValid,
    setChapterId,
    setStatus,
    setDayId,
    setUnitId,
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

    changeSyllabusCode,
    changeSyllabusName,
    changeSyllabusVersion,
    setAttendeeNumber,
    setSyllabusDays,
    setCourseObjective,
    setTechnicalRequirement,
    setTrainingDeliveryPrinciple,
    setLevel,

    updateTrainingPrinciple,
    resetState,
} = updateSyllabusSlice.actions;

export default updateSyllabusSlice.reducer;
