import { Router } from 'express';
import animals from './api/animals';

const api = Router();

api.use('/animals', animals);

module.exports = api;
