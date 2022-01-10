import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.scss';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import PrintOrderForm from './components/PrintOrderForm/PrintOrderForm';
import ImageCardList from './components/ImageCardList/ImageCardList';

ReactDOM.render(
  <React.StrictMode>
    {/* <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='order-prints/:imageDate' element={<PrintOrderForm />} />
        <Route
          path='*'
          element={
            <main style={{ width: '80%', margin: '0 auto', padding: '1rem' }}>
              <p>Uh Oh, something broke</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter> */}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
