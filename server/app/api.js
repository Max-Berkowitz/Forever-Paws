import { Router } from 'express';
import animal from './api/animal';
import animals from './api/animals';

const api = Router();

api.use('/animal', animal);

api.use('/animals', animals);

module.exports = api;
