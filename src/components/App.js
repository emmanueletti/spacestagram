import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import testData from '../lib/testData';
import ImageCardList from './ImageCardList/ImageCardList';
import PrintOrderForm from './PrintOrderForm/PrintOrderForm';
import AppLayout from './AppLayout/AppLayout';
import ImagesDataProvider from '../Providers/ImagesDataProvider';

export default function App() {
  return (
    <ImagesDataProvider>
      <AppLayout>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ImageCardList />} />
            <Route
              path='order-prints/:imageDate'
              element={<PrintOrderForm />}
            />
            <Route
              path='*'
              element={
                <p style={{ padding: '1rem' }}>Uh Oh, something broke</p>
              }
            />
          </Routes>
        </BrowserRouter>
      </AppLayout>
    </ImagesDataProvider>
  );
}
