import moment from 'moment/moment';

import * as SyllabusDay from '../SyllabusDay';

const Syllabus3 = {
    id: 3,
    code: 'DOC',
    version: '1.5',
    name: 'Docker',
    status: 'Active',
    days: 3,
    hours: 12,
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

export default Syllabus3;
