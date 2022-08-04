import './App.css';
import { ThemeProvider } from 'styled-components';
import Header from './layout/Header';
import { Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import { useLocation } from 'react-router-dom';
import { theme } from './shared/Styles';
import ProjectEditor from './components/ProjectEditor/ProjectEditor';
import axios from 'axios';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Container from './layout/Container';
import Home from './pages/Home';
import GlobalStyle from './styles/global';
import Project from './pages/Project';
import Pledges from './components/MyPage/Pledges';
import PledgeDetail from './components/MyPage/PledgeDetail';

function App() {
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
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
