import Class from '../pages/Class';
import User from '../pages/User';
import ProgramList from '../pages/ProgramList';
import Syllabus from '../pages/Syllabus';
import ClassDetail from '../pages/ClassDetail';
import CreateClassStep1 from '../pages/CreateClass/CreateClassStep1';
import { Home } from '../pages';
import CreateClassStep2 from '../pages/CreateClass/CreateClassStep2';
import CreateClassStep3 from '../pages/CreateClass/CreateClassStep3';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/class', component: Class },
    { path: '/user', component: User },
    { path: '/training-program', component: ProgramList },
    { path: '/syllabus', component: Syllabus },
    { path: '/class-detail', component: ClassDetail },
    { path: '/create-class/step-1', component: CreateClassStep1 },
    { path: '/create-class/step-2', component: CreateClassStep2 },
    { path: '/create-class/step-3', component: CreateClassStep3 },
];

export { publicRoutes };
