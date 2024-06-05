import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import './scss/app.scss';
import { Home } from './pages/Home';
import { ErrorDisplay } from './components/ErrorDisplay';
import { MainLayout } from './Layouts/MainLayout';

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
  loading: () => <div>Загрузка...</div>,
});

const PageItem = Loadable({
  loader: () => import(/* webpackChunkName: "PageItem" */ './pages/PageItem'),
  loading: () => <div>Загрузка...</div>,
});

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />

        <Route
          path="cart"
          element={
            <React.Suspense fallback={<div>Загрузка...</div>}>
              <Cart />
            </React.Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <React.Suspense fallback={<div>Загрузка...</div>}>
              <PageItem />
            </React.Suspense>
          }
        />
        <Route path="*" element={<ErrorDisplay type={'notFound'} />} />
      </Route>
    </Routes>
  );
}

export default App;
