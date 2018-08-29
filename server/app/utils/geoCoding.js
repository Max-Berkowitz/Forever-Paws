import { get } from 'axios';

const { GMAPS_API: key } = process.env.NODE_ENV === 'production' ? process.env : require('../../../config/config');

export default address =>
  get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: { address, key },
  });
