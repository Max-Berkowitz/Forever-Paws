import app from './app/app';

const port = process.env.PORT || 3000;
// eslint-disable-next-line
app.listen(port, () => console.log('listening on port: ', port));
