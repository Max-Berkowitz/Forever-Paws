import Pet from './index';
import { addLikeForTodayToPetById } from '../pet_likes/petLike';

const saveAnimal = pet => Pet.forge(pet).save();

const getAnimals = () =>
  Pet.query(qb => {
    qb.select('*');
    qb.orderByRaw('random()');
    qb.limit(3);
  }).fetchAll();

const addLikeToPet = async ({ id }) => {
  const pet = await Pet.where({ id }).fetch();
  await pet.set('likeCounter', pet.attributes.likeCounter + 1).save();
  await addLikeForTodayToPetById(id);
};

export { saveAnimal, getAnimals, addLikeToPet };
