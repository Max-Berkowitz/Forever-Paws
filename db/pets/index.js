import db from '../index';

db.knex.schema.hasTable('pets').then(
  exists =>
    exists ||
    db.knex.schema
      .createTable('pets', pet => {
        pet.increments('id').primary();
        pet.string('name', 30);
        pet.boolean('adoptable').defaultTo(false);
        pet.string('userId');
        pet.integer('likeCounter').defaultTo(0);
        pet.string('breed');
        pet.string('description');
        pet.string('age');
        pet.string('picture');
        pet.string('address');
        pet.string('website');
        pet.specificType('point', 'geometry(point, 4326)');
      })
      // eslint-disable-next-line
      .then(table => `Pets Table Created: ${console.log(table)}`)
);

export default db.model('Pet', db.Model.extend({ tableName: 'pets' }));
