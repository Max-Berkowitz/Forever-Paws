import db from '../index';

db.knex.schema.hasTable('media').then(
  exists =>
    exists ||
    db.knex.schema
      .createTable('media', media => {
        media.increments('id').primary();
        media.integer('petId');
        media.string('link');
      })
      // eslint-disable-next-line
      .then(table => `Media Table Created: ${console.log(table)}`)
);

export default db.model('Media', db.Model.extend({ tableName: 'media' }));
