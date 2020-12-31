import { registerAs } from '@nestjs/config';

export const cmsConfig = registerAs('cms', () => ({
  port: parseInt(process.env.PT_ADMIN_PORT, 10) || 3101,
  db: {
    uri: process.env.PT_ADMIN_DB || 'mongodb://localhost:27017/cms',
    user: process.env.PT_ADMIN_DB_USER,
    pass: process.env.PT_ADMIN_DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
}));

export type CmsConfigType = ReturnType<typeof cmsConfig>;
