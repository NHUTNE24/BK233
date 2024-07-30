import moment from 'moment/moment';

import * as Syllabus from '../Syllabus';

export const TrainingProgram = [
	{
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
		syllabi: Syllabus,
	},
	{
		id: 2,
		name: 'AWS Solutions Architect',
		status: 'Active',
		days: 21,
		hours: 63,
		modified_on: moment('2022-07-15').format('DD/MM/YYYY'),
		modified_by: 'Dustin Doan',
		general_information: [
			'Learn how to design distributed systems on the AWS platform',
			'Understand how to design resilient architectures',
			'Learn how to design cost-optimized architectures',
		],
		syllabi: Syllabus,
	},
	{
		id: 3,
		name: 'Docker & Kubernetes',
		status: 'Active',
		days: 14,
		hours: 42,
		modified_on: moment('2022-07-30').format('DD/MM/YYYY'),
		modified_by: 'Elizabeth Nguyen',
		general_information: [
			'Learn how to containerize applications',
			'Understand how to design resilient architectures',
			'Learn how to design cost-optimized architectures',
		],
		syllabi: Syllabus,
	},
];
