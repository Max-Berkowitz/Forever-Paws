import codeSplittingHelper from './codeSplittingHelper';

const LandingPage = codeSplittingHelper(() => import('../LandingPage'));
const GetLocation = codeSplittingHelper(() => import('../getUserLocation'));
const PetIndex = codeSplittingHelper(() => import('../users/routes/pet/index'));
const TopDogs = codeSplittingHelper(() => import('../users/routes/topdogs/index'));
const MyPets = codeSplittingHelper(() => import('../users/routes/mypets/index'));

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
  {
    path: '/topdogs',
    component: TopDogs,
    exact: true,
  },
  {
    path: '/mypets',
    component: MyPets,
    exact: true,
  },
  {
    path: '/location',
    component: GetLocation,
    exact: true,
  },
];
