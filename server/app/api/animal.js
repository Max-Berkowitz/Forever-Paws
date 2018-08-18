import { Router } from 'express';
import { postRes } from '../utils/utils';
import { saveAnimal } from '../../../db/pets/pet';

const animal = Router();

animal.route('/').post(postRes(saveAnimal));

export default animal;
