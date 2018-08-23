import PetLikes, { truncate } from './index';

const getTopPetsOfTheDay = async () => {
  const topPets = await PetLikes.orderBy('likes')
    .limit(5)
    .fetch({ withRelated: ['pets'] });
  return topPets.related('pets');
};

export { getTopPetsOfTheDay, truncate as reset };
