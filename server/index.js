import app from './app/app';

const Console = console;

const port = process.env.PORT || 3000;
app.listen(port, () => Console.log('listening on port: ', port));
