import { createConnection } from 'typeorm';
import 'reflect-metadata';
import { User } from '../src/entity/user';

createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'admin',
  database: 'test',
  entities: [__dirname + 'db/entity/*.ts'],
  synchronize: true,
  logging: false,
})
  .then(connection => {
    // here you can start to work with your entities
    server.start(() => console.log('Server is running'));
  })
  .catch(error => console.log(error));
