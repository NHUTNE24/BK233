import moment from 'moment/moment';

import * as SyllabusDay from '../SyllabusDay';

const Syllabus6 = {
    id: 6,
    code: 'MOC',
    version: '2.5',
    name: 'Mock Project',
    status: 'Inactive',
    days: 3,
    hours: 12,
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

export default Syllabus6;
