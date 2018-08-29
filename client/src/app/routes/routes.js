import codeSplittingHelper from './codeSplittingHelper';

const Profile = codeSplittingHelper(() => import('../users/routes/pet/Profile'));
const User = codeSplittingHelper(() => import('../users/routes/pet/User'));
const AddPet = codeSplittingHelper(() => import('../shelters/routes/AddPet'));
const Account = codeSplittingHelper(() => import('../shelters/routes/shelter'));
const Login = codeSplittingHelper(() => import('../shelters/routes/Login'));
const OrgPets = codeSplittingHelper(() => import('../shelters/routes/Pets'));
const LandingPage = codeSplittingHelper(() => import('../LandingPage'));
const GetLocation = codeSplittingHelper(() => import('../getUserLocation'));
const PetIndex = codeSplittingHelper(() => import('../users/routes/pet/index'));
const TopDogs = codeSplittingHelper(() => import('../users/routes/topdogs/index'));
const MyPets = codeSplittingHelper(() => import('../users/routes/mypets/index'));
const PetUpload = codeSplittingHelper(() => import('../shared/components/petUpload/AddDog'));

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
    path: '/profile',
    component: Profile,
    exact: true,
  },
  {
    path: '/user',
    component: User,
    exact: true,
  },
  {
    path: '/portal',
    component: Login,
    exact: true,
  },
  {
    path: '/account',
    component: Account,
    exact: true,
  },
  {
    path: '/addpet',
    component: AddPet,
    exact: true,
  },
  {
    path: '/orgpets',
    component: OrgPets,
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
  {
    path: '/petupload',
    component: PetUpload,
    exact: true,
  },
];
