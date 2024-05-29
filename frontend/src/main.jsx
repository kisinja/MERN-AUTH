import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux';
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import HomeScreen from './screens/HomeScreen.jsx';
import Login from './screens/Login.jsx';
import Register from './screens/Register.jsx';
import Profile from './screens/Profile.jsx';
import Private from './components/Private.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Private Routes */}
      <Route element={<Private />} path="">
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  </Provider>
)
