import {lazy} from 'react';

import { Loadable } from '../components/controls';
import PrivateRoute from './PrivateRoute';

const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));

const DoctorRoutes = {
  path: '/',
  element: <PrivateRoute />,
  children: [
    {
      path: '/dashboard',
      element: <Dashboard />
    },
  ]
};




export default DoctorRoutes