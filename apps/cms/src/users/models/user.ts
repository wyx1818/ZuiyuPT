import { prop } from '@typegoose/typegoose';

export class User {
  @prop({ required: true })
  name: string;

  @prop()
  password: string;
}
