import { Router } from 'express';
import { getRes, postRes, patchRes } from '../utils/utils';
import { getAnimal, saveAnimal, updateAnimal, addLikeToPet } from '../../../db/pets/pet';

const animal = Router();

animal.patch('/addlike', patchRes(addLikeToPet));

animal
  .route('/')
  .get(getRes({ pet: getAnimal }))
  .post(postRes(saveAnimal));

animal.patch('/:id', patchRes(updateAnimal));

export default animal;
