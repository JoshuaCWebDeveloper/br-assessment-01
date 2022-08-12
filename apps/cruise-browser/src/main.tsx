import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import { AppProvider, createLogic } from './redux/logic';
import { createStore } from './redux/store';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
`;

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <StrictMode>
        <GlobalStyle />
        <AppProvider store={createStore()} logic={createLogic()}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AppProvider>
    </StrictMode>
);
