import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import HomeLayout from "./layout/HomeLayout/HomeLayout";
import ClassLayout from "./layout/ClassLayout/ClassLayout";
import CreateClassLayout from "./layout/ClassLayout/CreateClassLayout";
import ClassList from "./pages/Class/ClassList";
import ClassDetail from "./pages/Class/ClassDetail";
import CreateClassStep1 from "./pages/Class/ClassCreate/CreateClassStep1";
import CreateClassStep2 from "./pages/Class/ClassCreate/CreateClassStep2";
import CreateClassStep3 from "./pages/Class/ClassCreate/CreateClassStep3";
import ClassUpdateLayout from "./layout/ClassLayout/ClassUpdateLayout";
import ClassUpdate from "./pages/Class/ClassUpdate/page1";
import TestingComponents from "./pages/TestingComponents";
import Login from "./pages/Login";
import LoginSuccess from "./pages/Login/LoginSuccess";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/login-success" element={<LoginSuccess />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <HomeLayout />
                </ProtectedRoute>
              }
            >
              <Route path="class" element={<ClassLayout />}>
                <Route path="list" element={<ClassList />} />
                <Route path=":id" element={<ClassDetail />} />
                <Route path="create" element={<CreateClassLayout />}>
                  <Route path="step1" element={<CreateClassStep1 />} />
                  <Route path=":className/step2" element={<CreateClassStep2 />} />
                  <Route path=":className/step3" element={<CreateClassStep3 />} />
                </Route>
                <Route path="update" element={<ClassUpdateLayout />}>
                  <Route path=":id" element={<ClassUpdate />} />
                  {/* <Route path=":classId/step2" element={<ClassUpdatePage2 />} /> */}
                </Route>
                <Route path="edit" />
              </Route>
              <Route path="testing" element={<TestingComponents />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
