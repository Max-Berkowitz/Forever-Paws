import codeSplittingHelper from './codeSplittingHelper';

const PetIndex = codeSplittingHelper(() => import('../users/routes/pet/index'));
const LandingPage = codeSplittingHelper(() => import('../LandingPage'));

export default [
  {
    path: '/',
    component: LandingPage,
    exact: true,
  },
  {
    path: '/pets',
    component: PetIndex,
    exact: true,
  },
];
