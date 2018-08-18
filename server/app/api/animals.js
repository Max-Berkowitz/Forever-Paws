import { Router } from 'express';
import { getRes } from '../utils/utils';
import { getAnimals } from '../../../db/pets/pet';

const animals = Router();

animals.route('/').get(getRes({ animals: getAnimals }));

export default animals;
