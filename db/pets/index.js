import db from '../index';

const Console = console;

db.knex.schema.hasTable('pets').then(
  exists =>
    exists ||
    db.knex.schema
      .createTable('pets', pet => {
        pet.increments('id').primary();
        pet.string('name', 30);
        pet.integer('userId');
        pet.boolean('adoptable').defaultTo(false);
        pet.integer('likeCounter');
        pet.string('breed');
        pet.string('caption');
        pet.string('weight');
      })
      .then(table => Console.log(table))
);

export default db.model('Pet', db.Model.extend({ tableName: 'pets', hasTimestamps: true }));
