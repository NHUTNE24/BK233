import moment from 'moment/moment';

import * as SyllabusDay from '../SyllabusDay';

export const Syllabus = [
    {
        id: 1,
        code: 'LIN',
        version: '2.0',
        name: 'Linux',
        status: 'Active',
        days: 4,
        hours: 12,
        modified_on: moment('2022-07-23').format('DD/MM/YYYY'),
        modified_by: 'Johny Deep',
        syllabus_days: SyllabusDay,
    },

    {
        id: 2,
        code: 'AWB',
        version: '1.0',
        name: 'AWS basic',
        status: 'Active',
        days: 7,
        hours: 21,
        modified_on: moment('2022-07-23').format('DD/MM/YYYY'),
        modified_by: 'Warrior Tran',
        syllabus_days: SyllabusDay,
    },
    {
        id: 3,
        code: 'DOC',
        version: '1.5',
        name: 'Docker',
        status: 'Active',
        days: 3,
        hours: 12,
        modified_on: moment('2022-07-23').format('DD/MM/YYYY'),
        modified_by: 'Warrior Tran',
        syllabus_days: SyllabusDay,
    },
    {
        id: 4,
        code: 'KUB',
        version: '1.5',
        name: 'Kubernetes',
        status: 'Active',
        days: 6,
        hours: 18,
        modified_on: moment('2022-07-23').format('DD/MM/YYYY'),
        modified_by: 'Ba Chu Heo',
        syllabus_days: SyllabusDay,
    },
    {
        id: 5,
        code: 'DEC',
        version: '2',
        name: 'DevOps_CICD',
        status: 'Active',
        days: 8,
        hours: 24,
        modified_on: moment('2022-07-23').format('DD/MM/YYYY'),
        modified_by: 'Ba Chu Heo',
        syllabus_days: SyllabusDay,
    },
    {
        id: 6,
        code: 'MOC',
        version: '2.5',
        name: 'Mock Project',
        status: 'Inactive',
        days: 3,
        hours: 12,
        modified_on: moment('2022-07-23').format('DD/MM/YYYY'),
        modified_by: 'Ba Chu Heo',
        syllabus_days: SyllabusDay,
    },
];
