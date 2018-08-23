import db from '../index';

const Console = console;

db.knex.schema.hasTable('petlikes').then(
  exists =>
    exists ||
    db.knex.schema
      .createTable('petlikes', petLikes => {
        petLikes.increments('id').primary();
        petLikes.integer('likes').defaultTo(1);
        petLikes.integer('petId');
      })
      .then(table => `Users Table Created: ${Console.log(table)}`)
);

const truncate = () => db.knex('petlikes').truncate();

export { truncate };
export default db.model('PetLikes', db.Model.extend({ tableName: 'petlikes' }));
