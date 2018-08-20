import db from '../index';

const Console = console;

db.knex.schema.hasTable('users').then(
  exists =>
    exists ||
    db.knex.schema
      .createTable('users', user => {
        user.increments('id').primary();
        user.boolean('shelter').defaultTo(false);
        user.string('username', 30).unique();
        user.string('password');
        user.integer('phoneNumber');
        user.string('address');
        user.string('email');
        user.timestamp('created_at');
        user.timestamp('updated_at');
      })
      .then(table => `Users Table Created: ${Console.log(table)}`)
);

//! ^^^^^^^^^^^^^ fix to work with passport

export default db.model('User', db.Model.extend({ tableName: 'users', hasTimestamps: true }));
