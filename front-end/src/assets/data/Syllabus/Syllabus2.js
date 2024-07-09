import moment from 'moment/moment';

import * as SyllabusDay from '../SyllabusDay';

const Syllabus2 = {
    id: 2,
    code: 'AWB',
    version: '1.0',
    name: 'AWS basic',
    status: 'Active',
    days: 7,
    hours: 21,
    modified_on: moment('2022-07-23').format('DD/MM/YYYY'),
    modified_by: 'Warrior Tran',
    syllabus_days: [
        SyllabusDay.SyllabusDay1,
        SyllabusDay.SyllabusDay2,
        SyllabusDay.SyllabusDay3,
        SyllabusDay.SyllabusDay4,
        SyllabusDay.SyllabusDay5,
    ],
};

export default Syllabus2;
