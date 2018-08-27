import Pet from './index';
import { addLikeForTodayToPetById } from '../petlikes/petLike';

const saveAnimal = (pet, { user, point }) => Pet.forge({ ...pet, userId: user, point }).save();

const updateAnimal = async (petAttributes, { id }, { user }) => {
  const pet = await Pet.where({ id }).fetch();
  if (pet.attributes.userId === user) {
    await pet.set(petAttributes).save();
  }
};

const getAnimal = ({ id }) => Pet.where({ id }).fetch();

const getAnimals = () =>
  Pet.query(qb => {
    qb.select('*');
    qb.orderByRaw('random()');
    qb.limit(3);
  }).fetchAll();

const getAnimalsByUserId = (body, { user }) => Pet.where({ userId: user }).fetchAll();

const addLikeToPet = async ({ id }) => {
  const pet = await Pet.where({ id }).fetch();
  await pet.set('likeCounter', pet.attributes.likeCounter + 1).save();
  await addLikeForTodayToPetById(id);
};

export { saveAnimal, updateAnimal, getAnimal, getAnimals, getAnimalsByUserId, addLikeToPet };
