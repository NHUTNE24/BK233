import moment from 'moment/moment';

import * as Syllabus from '../Syllabus';

const TrainingProgram = {
    id: 1,
    name: 'DevOps Foundation',
    status: 'Active',
    days: 31,
    hours: 97,
    modified_on: moment('2022-07-23').format('DD/MM/YYYY'),
    modified_by: 'Warrior Tran',
    general_information: [
        'Leverage DevOps practices to transform processes with Lean, Agile, and ITSM',
        'Learn how to break the silos between Development and Operations',
        'Experiential learning with case studies, real-world success stories, engaging activities, more',
    ],
    syllabi: [
        Syllabus.Syllabus1,
        Syllabus.Syllabus2,
        Syllabus.Syllabus3,
        Syllabus.Syllabus4,
        Syllabus.Syllabus5,
        Syllabus.Syllabus6,
    ],
};

export default TrainingProgram;
