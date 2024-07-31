import { createSlice } from '@reduxjs/toolkit';

const syllabusDetailSlice = createSlice({
    name: 'syllabusDetail',
    initialState: {
        syllabus: {
            attendeeNumber: '',
            courseObjective: '',
            createdBy: '',
            createdDate: '',
            days: 0,
            deliveryPrinciple: '',
            hours: 0,
            id: '',
            level: '',
            modifiedBy: '',
            modifiedDate: '',
            status: '',
            syllabusId: '',
            technicalRequirement: '',
            topicCode: '',
            topicName: '',
            version: '',
        },
        assignmentSchema: {
            assessment_scheme_id: '',
            assignment: 0,
            final: 0,
            final_practice: 0,
            final_theory: 0,
            gpa: 0,
            quiz: 0,
            syllabus_id: '',
        },
        syllabusDays: [
            {
                id: '',
                created_by: '',
                created_date: '',
                modified_by: '',
                modified_date: '',
                day_no: 0,
                is_deleted: 0,
                syllabus_day_id: '',
                syllabus_id: '',
            },
        ],
        syllabusUnits: [
            [
                {
                    id: '',
                    created_by: '',
                    created_date: '',
                    modified_by: '',
                    modified_date: '',
                    duration: 0,
                    is_deleted: 0,
                    name: '',
                    syllabus_day_id: '',
                    syllabus_unit_id: '',
                    unit_no: 0,
                },
            ],
        ],
        unitChapterDetailInfos: [
            [
                {
                    id: '',
                    created_by: '',
                    created_date: '',
                    modified_by: '',
                    modified_date: '',
                    chapter_no: 0,
                    delivery_type_id: '',
                    duration: 0,
                    is_deleted: 0,
                    is_online: 0,
                    name: '',
                    output_standard_id: '',
                    syllabus_unit_id: '',
                    unit_chapter_id: '',
                },
            ],
        ],
    },
    reducers: {
        setData: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});

export const { setData } = syllabusDetailSlice.actions;
export default syllabusDetailSlice.reducer;
