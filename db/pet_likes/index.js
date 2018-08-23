import db from '../index';

const Console = console;

db.knex.schema.hasTable('pet_likes').then(
  exists =>
    exists ||
    db.knex.schema
      .createTable('pet_likes', petLikes => {
        petLikes.increments('id').primary();
        petLikes.integer('likes');
        petLikes
          .integer('pet_id')
          .unique()
          .references('pets.id');
      })
      .then(table => `Users Table Created: ${Console.log(table)}`)
);

const truncate = () => db.knex('pet_likes').truncate();

export { truncate };
export default db.model('PetLikes', db.Model.extend({ tableName: 'pet_likes' }));
