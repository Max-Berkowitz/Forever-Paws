import db from '../index';

db.knex.schema.hasTable('petlikes').then(
  exists =>
    exists ||
    db.knex.schema
      .createTable('petlikes', petLikes => {
        petLikes.increments('id').primary();
        petLikes.integer('likes').defaultTo(1);
        petLikes.integer('petId');
      })
      // eslint-disable-next-line
      .then(table => `Users Table Created: ${console.log(table)}`)
);

const truncate = () => db.knex('petlikes').truncate();

export { truncate };
export default db.model('PetLikes', db.Model.extend({ tableName: 'petlikes' }));
