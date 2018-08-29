import db from '../index';

db.knex.schema.hasTable('users').then(
  exists =>
    exists ||
    db.knex.schema
      .createTable('users', user => {
        user.increments('id').primary();
        user.boolean('shelter').defaultTo(false);
        user.string('username');
        user.string('password');
        user.string('googleId').unique();
        user.string('firstName');
        user.string('facebookId').unique();
        user.string('lastName');
        user.string('email');
        user.string('website').unique();
        user.string('address');
        user.specificType('point', 'geometry(point, 4326)');
      })
      // eslint-disable-next-line
      .then(table => `Users Table Created: ${console.log(table)}`)
);

export default db.model('User', db.Model.extend({ tableName: 'users' }));
