import PetLikes, { truncate } from './index';
import Pet from '../pets/index';

const getTopPetsOfTheDay = async () => {
  const topPets = await PetLikes.query(qb => {
    qb.select('*');
    qb.orderByRaw('-likes');
    qb.limit(5);
  }).fetchAll();
  const data = await Promise.all(topPets.toJSON().map(topPet => Pet.where({ id: topPet.petId }).fetch()));
  return { toJSON: () => data.map(pet => pet.toJSON()) };
};

const addLikeForTodayToPetById = async petId => {
  const petLikes = await PetLikes.where({ petId }).fetch();
  if (petLikes) {
    await petLikes.set('likes', petLikes.attributes.likes + 1).save();
  } else {
    await PetLikes.forge({ petId }).save();
  }
};

export { getTopPetsOfTheDay, addLikeForTodayToPetById, truncate as reset };
