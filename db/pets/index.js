import db from '../index';

const Console = console;

db.knex.schema.hasTable('pets').then(
  exists =>
    exists ||
    db.knex.schema
      .createTable('pets', pet => {
        pet.increments('id').primary();
        pet.string('name', 30);
        pet.boolean('adoptable').defaultTo(false);
        pet.integer('likeCounter').defaultTo(0);
        pet.string('breed');
        pet.string('description');
        pet.string('age');
        pet.string('picture');
        pet.timestamp('created_at');
        pet.timestamp('updated_at');
      })
      .then(table => `Pets Table Created: ${Console.log(table)}`)
);

export default db.model('Pet', db.Model.extend({ tableName: 'pets', hasTimestamps: true }));
