
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, CodeVerification, LoginForm, PasswordRecovery, SetNewPassword, UserList } from "./pages/User";
import { TrainingProgramDetail, TrainingProgramView, TrainingProgramList } from './pages';
import "./App.css";

import TrainingProgram from '../src/assets/data/TrainingProgram';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
        <Route path="/code-verification" element={<CodeVerification />} />
        <Route path="/set-new-password" element={<SetNewPassword />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/user-list" element={<UserList />} />
        {/* <Route path="/view-program" element={<TrainingProgramDetail TrainingProgram={TrainingProgram} Syllabus={TrainingProgram.syllabi[5]} />} /> */}
        <Route path="/view-program" element={<TrainingProgramList TrainingProgram={TrainingProgram} Syllabus={TrainingProgram?.syllabi[0]} />} />
      </Routes>
    </Router>
  );
}

// import Routers from './Routers/Routers';
// import { Button, ConfigProvider } from 'antd';
// import './App.css';
// import DateModalExample from './components/DateModalExample';

// const App = () => {
//     return (
//         <>
//             <Routers />

//             <div>
//                 <DateModalExample />
//             </div>
//         </>
// =======
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { publicRoutes } from './Routers';
// import DefaultLayout from './layout/DefaultLayout';

// const App = () => {
//     return (
//         <Router>
//             <div className="App">
//                 <Routes>
//                     {publicRoutes.map((route, index) => {
//                         const Page = route.component;
//                         return (
//                             <Route
//                                 key={index}
//                                 path={route.path}
//                                 element={
//                                     <DefaultLayout>
//                                         <Page />
//                                     </DefaultLayout>
//                                 }
//                             ></Route>
//                         );
//                     })}
//                 </Routes>
//             </div>
//         </Router>


export default App;
