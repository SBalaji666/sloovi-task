import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import * as bootstrap from 'bootstrap';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { fetchUsers } from './features/taskslist/taskSlice';

store.dispatch(fetchUsers());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
