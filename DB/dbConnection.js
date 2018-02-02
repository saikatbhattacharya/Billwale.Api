import mongoose from 'mongoose';
import config from '../config';
import logger from '../logger';

mongoose.connect(config.mongodb);

const dbCon = mongoose.connection;

dbCon.on('error', console.error.bind(console, 'connection error:'));
dbCon.once('open', function () {
    logger.info("Database Connected")
});

export default dbCon;
