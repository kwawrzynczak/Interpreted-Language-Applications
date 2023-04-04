import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import routes from './common/routes';
import Basket from './pages/Basket';
import Home from './pages/Home';
import Login from './pages/Login';
import Orders from './pages/Orders';
import { injectStore } from './services/api';
import { persistor, store } from './store';
import MainTemplate from './templates/MainTemplate';

injectStore(store);

export const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <MainTemplate>
          <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.basket} element={<Basket />} />
            <Route path={routes.orders} element={<Orders />} />
          </Routes>
        </MainTemplate>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
