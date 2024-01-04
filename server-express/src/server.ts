import { connect } from 'mongoose';
import { app } from './index';

import './types';
import './app/server/dotenv';

import { configureApp } from './app/server/configure.app';

import {
  configureMiddlewaresBeforeRouter,
  configureMiddlewaresAfterRouter,
} from './app/server/configure.middlewares';

import { APP_INFO_CONFIG } from './config/app.info';
import { SECRET_CONFIG } from './config/secrets';

const configure = () => {
  configureMiddlewaresBeforeRouter(app);

  configureApp(app);

  configureMiddlewaresAfterRouter(app);
};

const server = {
  start: function () {
    configure();

    app.listen(APP_INFO_CONFIG.PORT, async () => {
      await connect(SECRET_CONFIG.MONGODB_LINK);
      console.log(`The App has been started at ${APP_INFO_CONFIG.PORT} port`);
    });
  },
};
export { server };
