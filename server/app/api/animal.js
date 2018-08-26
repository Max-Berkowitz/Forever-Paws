import { Router } from 'express';
import { getRes, postRes, patchRes } from '../utils/utils';
import { getAnimal, saveAnimal, updateAnimal, addLikeToPet } from '../../../db/pets/pet';

const animal = Router();

animal.patch('/addlike', patchRes(addLikeToPet));

animal
  .route('/:id')
  .get(getRes({ pet: getAnimal }))
  .post(postRes(saveAnimal))
  .patch(patchRes(updateAnimal));

export default animal;
