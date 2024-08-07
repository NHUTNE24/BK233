import {
    BrowserRouter,
    Routes,
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom';
import './App.css';

import HomePage from './pages/Home';

import HomeLayout from './layout/HomeLayout/HomeLayout';
import ClassLayout from './layout/ClassLayout/ClassLayout';
import CreateClassLayout from './layout/ClassLayout/CreateClassLayout';
import { ProgramCreate, ProgramDetail, ProgramList } from 'src/pages/Program';
import ProgramLayout from './layout/ProgramLayout/ProgramLayout';
import CreateProgramLayout from './layout/ProgramLayout/CreateProgramLayout';

import ClassList from './pages/Class/ClassList';
import ClassDetail from './pages/Class/ClassDetail';
import CreateClassStep1 from './pages/Class/ClassCreate/CreateClassStep1';
import CreateClassStep2 from './pages/Class/ClassCreate/CreateClassStep2';
import CreateClassStep3 from './pages/Class/ClassCreate/CreateClassStep3';
import ClassUpdateLayout from './layout/ClassLayout/ClassUpdateLayout';
import ClassUpdate from './pages/Class/ClassUpdate/page1';
import ClassUpdatePage2 from './pages/Class/ClassUpdate/page2';

import ViewSyllabus from 'src/pages/Syllabus/ViewSyllabus';
import SyllabusDetail from 'src/pages/Syllabus/SyllabusDetail';
import EditSyllabus from 'src/pages/Syllabus/EditSyllabus';
import CreateSyllabus from 'src/pages/Syllabus/CreateSyllabus';
{
    /* Testing components */
}
import TestingComponents from './pages/TestingComponents';
import SyllabusLayout from './layout/SyllabusLayout/SyllabusLayout';
import UserLayout from './layout/UserLayout/UserLayout';
import UserList from './pages/User/UserList/UserList';
import RolePermission from './pages/User/RolePermission/RolePermission';
import UserCalendar from './pages/Setting/UserCalendar/UserCalendar';

// Login
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import Login from './pages/Login';
import LoginSuccess from './pages/Login/LoginSuccess';

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/login-success"
                            element={<LoginSuccess />}
                        />
                        <Route
                            path="/*"
                            element={
                                <ProtectedRoute>
                                    <HomeLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route path="" element={<HomePage />}></Route>
                            <Route path="class" element={<ClassLayout />}>
                                <Route path="list" element={<ClassList />} />
                                <Route path=":id" element={<ClassDetail />} />
                                <Route
                                    path="create"
                                    element={<CreateClassLayout />}
                                >
                                    <Route
                                        path="step1"
                                        element={<CreateClassStep1 />}
                                    />
                                    <Route
                                        path=":className/step2"
                                        element={<CreateClassStep2 />}
                                    />
                                    <Route
                                        path=":className/step3"
                                        element={<CreateClassStep3 />}
                                    />
                                </Route>
                                <Route
                                    path="update"
                                    element={<ClassUpdateLayout />}
                                >
                                    <Route
                                        path=":id"
                                        element={<ClassUpdate />}
                                    />
                                    {/* <Route path=":classId/step2" element={<ClassUpdatePage2 />} /> */}
                                </Route>
                                <Route path="edit" />
                            </Route>
                            <Route path="program" element={<ProgramLayout />}>
                                <Route
                                    path="view-program/:trainingProgramCode/*"
                                    element={<ProgramDetail />}
                                />
                                <Route
                                    path="view-program"
                                    element={<ProgramList />}
                                />

                                <Route
                                    path="create-program"
                                    element={<CreateProgramLayout />}
                                >
                                    <Route
                                        path=""
                                        element={
                                            <ProgramCreate.CreateTrainingProScreen1 />
                                        }
                                    />
                                    <Route
                                        path=":programName"
                                        element={
                                            <ProgramCreate.CreateTrainingSyllabus_add />
                                        }
                                    />
                                </Route>
                            </Route>
                            {/* Syllabus routes */}
                            {/* <Route path="syllabus" element={<SyllabusLayout/>}>
                        </Route> */}
                            <Route path="syllabus" element={<ViewSyllabus />} />
                            <Route
                                path="syllabus/:id"
                                element={<SyllabusDetail />}
                            />
                            <Route
                                path="edit-syllabus/:id"
                                element={<EditSyllabus />}
                            />
                            <Route
                                path="create-syllabus"
                                element={<CreateSyllabus />}
                            />
                            {/* EndSyllabus routes  */}

                            <Route
                                path="testing"
                                element={<TestingComponents />}
                            />
                            <Route path="user" element={<UserLayout />}>
                                <Route path="list" element={<UserList />} />
                                <Route
                                    path="permission"
                                    element={<RolePermission />}
                                />
                            </Route>
                            <Route path="setting">
                                <Route
                                    path="calendar"
                                    element={<UserCalendar />}
                                />
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
};

export default App;
