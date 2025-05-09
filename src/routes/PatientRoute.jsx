import {lazy} from 'react';

import { Loadable } from '../components/controls';
import PrivateRoute from './PrivateRoute';

const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));
const DoctorDetails = Loadable(lazy(() => import('../pages/DoctorDetails')));

const PatientRoutes = {
  path: '/',
  element: <PrivateRoute />,
  children: [
    {
      path: '/dashboard',
      element: <Dashboard />
    },
    {
      path: '/dashboard/details',
      element: <DoctorDetails />
    },
  ]
};




export default PatientRoutes