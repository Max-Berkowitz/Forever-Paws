import { Router } from 'express';
import { getRes } from '../utils/utils';
import { getAnimals, getAnimalsByUserId } from '../../../db/pets/pet';
import { getTopPetsOfTheDay } from '../../../db/petlikes/petLike';

const animals = Router();

animals.route('/').get(getRes({ animals: getAnimals }));

animals.get('/dailytop', getRes({ dailyTop: getTopPetsOfTheDay }));

animals.get('/my', getRes({ myPets: getAnimalsByUserId }));

export default animals;
