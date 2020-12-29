import { registerAs } from '@nestjs/config';

const adminConfig = registerAs('admin', () => ({
  port: parseInt(process.env.PT_ADMIN_PORT, 10) || 3100,
  db: {
    uri: process.env.PT_ADMIN_DB || 'mongodb://localhost:27017/test',
    user: process.env.PT_ADMIN_DB_USER,
    pass: process.env.PT_ADMIN_DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
}));

export default adminConfig;

export type AdminConfigType = ReturnType<typeof adminConfig>;
