import codeSplittingHelper from './codeSplittingHelper';

const HomePage = codeSplittingHelper(() => import('./components/HomePage'));
const LandingPage = codeSplittingHelper(() => import('./components/LandingPage'));

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
