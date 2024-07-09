import moment from 'moment/moment';

import * as SyllabusDay from '../SyllabusDay';

const Syllabus1 = {
    id: 1,
    code: 'LIN',
    version: '2.0',
    name: 'Linux',
    status: 'Active',
    days: 4,
    hours: 12,
    modified_on: moment('2022-07-23').format('DD/MM/YYYY'),
    modified_by: 'Johny Deep',
    syllabus_days: [
        SyllabusDay.SyllabusDay1,
        SyllabusDay.SyllabusDay2,
        SyllabusDay.SyllabusDay3,
        SyllabusDay.SyllabusDay4,
        SyllabusDay.SyllabusDay5,
    ],
};

export default Syllabus1;
