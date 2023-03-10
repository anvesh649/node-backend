import mongoose from 'mongoose';
import Logger from 'bunyan';
import { config } from '@root/config';

const log: Logger = config.createLogger('setupDatabase');

export default () => {
  const connect = () => {
    mongoose
      .connect('mongodb://localhost:27017/chattyapp-backend')
      .then(() => {
        log.info('Successfully connected to database.');
      })
      .catch((err) => {
        log.error('Error connecting to database', err);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
