// import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';

export default [
  {
    path: '/',
    component: LandingPage,
    exact: true,
  },
  {
    path: '/pets',
    component: HomePage,
    exact: true,
  },
];
