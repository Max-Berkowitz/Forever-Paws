import { Router } from 'express';

const animals = Router();

animals.get('/', (req, res) => res.sendStatus(200));

module.exports = animals;
