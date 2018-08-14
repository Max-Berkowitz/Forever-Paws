import { createConnection } from 'typeorm';
import 'reflect-metadata';
import { User } from './entity/user';
import { Pets } from './entity/pets';
import { Media } from './entity/media';

createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'admin',
  database: 'test',
  entities: [User, Pets, Media],
  synchronize: true,
})
  .then(connection => {
    // here you can start to work with your entities
    console.log('Server is running port 5432');
  })
  .catch(error => console.log(error));
