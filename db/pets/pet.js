import Pet from './index';
import { addLikeForTodayToPetById } from '../petlikes/petLike';
import db from '../index';

const saveAnimal = (pet, { user }) => {
  const { longitude, latitude } = pet;
  const petREFACTORTHIS = pet;
  delete petREFACTORTHIS.longitude;
  delete petREFACTORTHIS.latitude;
  Pet.forge({
    ...petREFACTORTHIS,
    userId: user,
    point: db.knex.raw(`ST_SetSRID(ST_Point(${longitude},${latitude}) , 4326)`),
  }).save();
};

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

const getClosestPets = async ({ location: { userLatitude, userLongitude } }) => {
  const randomPets = await db.knex.raw(
    `select *,st_distance(ST_transform(ST_GeomFromText('POINT(${userLongitude} ${userLatitude})', 4326),2163), ST_Transform(pets.point,2163)) as distance from pets
    where pets.point IS NULL OR ST_Dwithin(ST_transform(ST_GeomFromText('POINT(${userLongitude} ${userLatitude})', 4326),2163), ST_Transform(pets.point,2163), 100000) 
    ORDER BY random() LIMIT 5`
  );
  return {
    toJSON() {
      return this.randomPets.rows;
    },
    randomPets,
  };
};

export { saveAnimal, updateAnimal, getAnimal, getAnimals, getAnimalsByUserId, addLikeToPet, getClosestPets };
