import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/index';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import LoadingSpinner from './layout/LodingSpinner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // React.Suspense를 쓰기위한 옵션 전달
      suspense: true,
      onError: (err) => console.log(err.message) // 전체 에러를 핸들링할 수 있음
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Suspense fallback={<LoadingSpinner />}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </Suspense>
  </BrowserRouter>
);
