import { Router } from 'express';
import { postRes } from '../utils/utils';
import { saveAnimal } from '../../../src/helpers';

const animal = Router();

animal.route('/').post(postRes(saveAnimal));

module.exports = animal;
