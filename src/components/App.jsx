import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import { setUser, setUserRequest } from '../services/actions/user';
import BasicLayout from './layouts/BasicLayout';
import {
  SignUp, LogIn, ResetPassword, VerifyEmail,
  NoMatch, Home, Profile, Projects, ProjectPage, CreateProject, EditProject
} from '../pages'


const App = () => {

  const dispatch = useDispatch();
  const { isUserRequest } = useSelector(store => store.user);

  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, (user) => {
        if (user && !user.emailVerified) {
          dispatch(setUser({
              email: user.email,
              emailVerified: false
            }));
        } else {
          dispatch(setUser(user));
        }
        if (isUserRequest) {
          dispatch(setUserRequest(false));
        }
    });
    return unsubscriber;
    //eslint-disable-next-line
  }, []);

  return (
      <Router>
        <Routes>
          <Route path="/" element={<BasicLayout />}>
            <Route index element={<Home />} />

            <Route element={<PublicRoute />}>
              <Route path="signup" element={<SignUp />} />
              <Route path="login" element={<LogIn />} />
              <Route path="verify-email" element={<VerifyEmail />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="projects">
                <Route path="new" element={<CreateProject />} />
                <Route path=":projectId" element={<ProjectPage />} />
                <Route path=":projectId/edit" element={<EditProject />} />
                <Route index element={<Projects />} />
              </Route>
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<NoMatch />} />
          </Route>
          
        </Routes>
      </Router>
    
  );
}

export default App;
