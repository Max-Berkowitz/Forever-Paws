import Pet from './index';
import { addLikeForTodayToPetById } from '../petlikes/petLike';

const saveAnimal = (pet, userId) => Pet.forge({ ...pet, userId }).save();

const getAnimals = () =>
  Pet.query(qb => {
    qb.select('*');
    qb.orderByRaw('random()');
    qb.limit(3);
  }).fetchAll();

const getAnimalsByUserId = ({ userId }) => Pet.where({ userId }).fetchAll();

const addLikeToPet = async ({ id }) => {
  const pet = await Pet.where({ id }).fetch();
  await pet.set('likeCounter', pet.attributes.likeCounter + 1).save();
  await addLikeForTodayToPetById(id);
};

export { saveAnimal, getAnimals, getAnimalsByUserId, addLikeToPet };
