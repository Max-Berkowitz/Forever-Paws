import Media from './index';

const saveAnimal = media =>
  new Promise((resolve, reject) =>
    new Media({ url: media.url }).fetch().then(found => (found ? reject() : Media.create(media).then(resolve)))
  );

const getAnimals = () =>
  new Promise((resolve, reject) =>
    Media.fetchAll()
      .then(found => resolve(JSON.parse(JSON.stringify(found))))
      .catch(reject)
  );

//! ^^^^^^^^^^^^^^^ fix both of these

export { saveAnimal, getAnimals };
