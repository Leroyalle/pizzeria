import { Routes, Route } from 'react-router-dom';
import './scss/app.scss';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { ErrorDisplay } from './components/ErrorDisplay';
import { PageItem } from './pages/PageItem';
import { MainLayout } from './Layouts/MainLayout';
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<PageItem />} />
        <Route path="*" element={<ErrorDisplay type={'notFound'} />} />
      </Route>
    </Routes>
  );
}

export default App;
