import { Routes, Route } from 'react-router-dom';
import ImageCardList from './ImageCardList/ImageCardList';
import PrintOrderForm from './PrintOrderForm/PrintOrderForm';
import AppLayout from './AppLayout/AppLayout';
import ImagesDataProvider from '../Providers/ImagesDataProvider';

export default function App() {
  return (
    <ImagesDataProvider>
      <AppLayout>
        <Routes>
          <Route path='/' element={<ImageCardList />} />
          <Route path='order-prints/:imageDate' element={<PrintOrderForm />} />
          <Route
            path='*'
            element={
              <p style={{ padding: '1rem' }}>Uh Oh, something went wrong</p>
            }
          />
        </Routes>
      </AppLayout>
    </ImagesDataProvider>
  );
}
