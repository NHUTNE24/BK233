import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import { Home, Login, About, SignUp, Error } from '../pages';
import ViewSyllabus from '../pages/ViewSyllabus';
const Routers = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="*" element={<Error />} />
                    <Route path="/view-syllabus" element={<ViewSyllabus/>}/>
                </Routes>
            </Router>
        </div>
    );
};

export default Routers;
