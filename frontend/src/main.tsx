// import { Provider } from "@/components/ui/provider"
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import {App} from './pages/App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <Provider>
//     <App/>
//     </Provider>
//   </StrictMode>,
// )


import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './router';
import { Provider } from './components/ui/provider';
import { ApiProvider } from './context/ApiProvider';

const BASE_URL = '/app';

ReactDOM.render(
  <React.StrictMode>
      <Provider>
        <BrowserRouter basename={BASE_URL}>
          <ApiProvider>
            <Router/>
          </ApiProvider>
        </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
