import moment from 'moment/moment';

import * as SyllabusDay from '../SyllabusDay';

const Syllabus5 = {
    id: 5,
    code: 'DEC',
    version: '2',
    name: 'DevOps_CICD',
    status: 'Active',
    days: 8,
    hours: 24,
    modified_on: moment('2022-07-23').format('DD/MM/YYYY'),
    modified_by: 'Ba Chu Heo',
    syllabus_days: [
        SyllabusDay.SyllabusDay1,
        SyllabusDay.SyllabusDay2,
        SyllabusDay.SyllabusDay3,
        SyllabusDay.SyllabusDay4,
        SyllabusDay.SyllabusDay5,
    ],
};

export default Syllabus5;
