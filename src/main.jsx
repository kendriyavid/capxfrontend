// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import Landing from './assets/Landing.jsx';
// import Stocklistings from './assets/Stocklistings.jsx';
// import Dashboard from "./assets/Dashboard.jsx";
// import Signin from './assets/Signin.jsx';
// import Signup from './assets/Signup.jsx';
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import {Provider} from 'react-redux';
// import ProtectedRoute from './assets/ProtectedRoutes.jsx';
// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from './assets/app/store';
// import GlobalStocks from './assets/features/globalStocks.js';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Landing />,
//   },
//   {
//     path: '/dashboard',

//     element:(
//       <ProtectedRoute>
//         <Dashboard/>
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: '/signin',
//     element: <Signin />,
//   },
//   {
//     path: '/stocks',
//     element:
//     (
//       <ProtectedRoute>
//         <Stocklistings/>
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: '/signup',
//     element: <Signup/>
//   }
// ]);

// createRoot(document.getElementById('root')).render(

//   <StrictMode>
//     <Provider store ={store}>
//       <PersistGate loading={null} persistor={persistor}>
//       <GlobalStocks />
//         <RouterProvider router={router} />
//       </PersistGate>
//     </Provider>
//   </StrictMode>
// );



import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Navigate } from 'react-router-dom';
import './index.css';
import Landing from './assets/Landing.jsx';
import Stocklistings from './assets/Stocklistings.jsx';
import Dashboard from "./assets/Dashboard.jsx";
import Signin from './assets/Signin.jsx';
import Signup from './assets/Signup.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import ProtectedRoute from './assets/ProtectedRoutes.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './assets/app/store';
import GlobalStocks from './assets/features/globalStocks.js';

const PublicRoute = ({ children }) => {
  const isAuthenticated = store.getState().auth.user !== null;
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard/>
      </ProtectedRoute>
    ),
  },
  {
    path: '/signin',
    element: (
      <PublicRoute>
        <Signin />
      </PublicRoute>
    ),
  },
  {
    path: '/stocks',
    element: (
      <ProtectedRoute>
        <Stocklistings/>
      </ProtectedRoute>
    ),
  },
  {
    path: '/signup',
    element: (
      <PublicRoute>
        <Signup/>
      </PublicRoute>
    ),
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStocks />
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);