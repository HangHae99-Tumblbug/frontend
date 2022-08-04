import './App.css';
import { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { theme } from './shared/Styles';
import ProjectEditor from './components/ProjectEditor/ProjectEditor';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { authActions } from './redux/auth-slice';
import Container from './layout/Container';
import GlobalStyle from './styles/global';
import Pledges from './components/MyPage/Pledges';
import PledgeDetail from './components/MyPage/PledgeDetail';
import KakaoOauth from './components/SignIn/KakaoOauth';
import React, { lazy } from 'react';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';

const Project = lazy(() => import('./pages/Project'));
const SignIn = lazy(() => import('./components/SignIn/SignIn'));
const SignUp = lazy(() => import('./components/SignUp/SignUp'));
const Home = lazy(() => import('./pages/Home'));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      dispatch(authActions.userLogin(jwtDecode(token).NAME));
    }
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Container />}>
            <Route index element={<Home />} />
            <Route path="/project/:projectId" element={<Project />} />
            <Route path="/pledges" element={<Pledges />}/>
            <Route path="/pledges/:fundid" element={<PledgeDetail />}/>
          </Route>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/project-editor/:tab" element={<ProjectEditor />} />
          <Route path="/kakao/callback" element={<KakaoOauth />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
