import Pet from './index';

const saveAnimal = pet => Pet.forge(pet).save();

const getAnimals = () =>
  Pet.query(qb => {
    qb.select('*');
    qb.orderByRaw('random()');
    qb.limit(3);
  }).fetchAll();

export { saveAnimal, getAnimals };
