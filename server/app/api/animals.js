import { Router } from 'express';
import { getRes } from '../utils/utils';
import { getAnimals } from '../../../db/pets/pet';
import { getTopPetsOfTheDay } from '../../../db/pet_likes/petLike';

const animals = Router();

animals.route('/').get(getRes({ animals: getAnimals }));

animals.get('/dailytop', getRes({ dailyTop: getTopPetsOfTheDay }));

export default animals;
