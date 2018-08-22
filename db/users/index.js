import db from '../index';

const Console = console;

db.knex.schema.hasTable('users').then(
  exists =>
    exists ||
    db.knex.schema
      .createTable('users', user => {
        user.increments('id').primary();
        user.boolean('shelter').defaultTo(false);
        user.string('username');
        user.string('googleId').unique();
        user.string('firstName');
        user.string('facebookId').unique();
        user.string('lastName');
        user.string('email');
        user.timestamp('created_at');
        user.timestamp('updated_at');
      })
      .then(table => `Users Table Created: ${Console.log(table)}`)
);

export default db.model('User', db.Model.extend({ tableName: 'users', hasTimestamps: true }));
