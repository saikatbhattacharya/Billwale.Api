import express from 'express';
import cors from 'cors';
import route from './router.js';
import logger from '../logger';

const app = express();
const port = process.env.PORT||4000;

app.use(cors());

route(app);

app.listen(port, () => {
    logger.info('App started on ', port);
});
