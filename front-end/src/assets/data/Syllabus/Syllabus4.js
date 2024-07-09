import moment from 'moment/moment';

import * as SyllabusDay from '../SyllabusDay';

const Syllabus4 = {
    id: 4,
    code: 'KUB',
    version: '1.5',
    name: 'Kubernetes',
    status: 'Active',
    days: 6,
    hours: 18,
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

export default Syllabus4;
