import { registerAs } from '@nestjs/config';
import * as path from 'path';

const trackerConfig = registerAs('tracker', () => ({
  port: parseInt(process.env.PT_TRACKER_PORT, 10) || 3102,
  // db: {
  //   uri: process.env.PT_TRACKER_DB || 'mongodb://localhost:27017/tracker',
  //   user: process.env.PT_TRACKER_DB_USER,
  //   pass: process.env.PT_TRACKER_DB_PASS,
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   useCreateIndex: true,
  //   useFindAndModify: false,
  // },
  i18n: {
    fallbackLanguage: 'en', // e.g., 'en'
    parserOptions: {
      path: path.join(__dirname, '/i18n/'),
    },
  },
  fallbackLanguage: 'en',
}));

export default trackerConfig;

export type TrackerConfigType = ReturnType<typeof trackerConfig>;
