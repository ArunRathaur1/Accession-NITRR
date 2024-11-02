import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, trim: true })
  username: string;

  @Prop({ required: true, trim: true, unique: true })
  email: string;

  @Prop({ required: true, trim: true })
  password: string;

  @Prop({ required: true, trim: true })
  branch: string;

  @Prop({ required: true, trim: true })
  year: string;

  @Prop({ required: true, trim: true })
  position: string;

  @Prop({ required: true, trim: true })
  domain: string;

  @Prop({ required: true })
  isLoggedIn: boolean;

  @Prop({ required: true })
  isAdmin: boolean;

  @Prop({ required: true })
  isHead: boolean;

  @Prop({ required: true })
  isCore: boolean;

  @Prop({ required: true })
  isExe: boolean;

  @Prop({ required: true, trim: true })
  linkedIn: string;

  @Prop({ trim: true })
  GitHub: string;

  @Prop({ trim: true })
  avatarUrl: string;

  @Prop({ type: Types.ObjectId, ref: 'Hiring', unique: true, trim: true })
  hiringId: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);

/*
username string
  email string
  password string
  branch string
  year string
  position_of_application string
  domain string
  linkedIN string
  github* string
  about string
  isLoggedIn boolean
  isAdmin boolean
  isHead boolean
  isCore boolean
  isExe boolean
}
*/
