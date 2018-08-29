import Knex from 'knex';
import bookshelf from 'bookshelf';

const knex = Knex({
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: process.env.NODE_ENV === 'test' ? 'thesisTest' : 'thesis',
  },
  useNullAsDefault: true,
});

const db = bookshelf(knex);
// Plugin for solving circular reference
db.plugin('registry');

export default db;
