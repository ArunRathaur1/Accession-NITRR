import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Hiring extends Document {
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

  @Prop({ required: true, trim: true })
  linkedIn: string;

  @Prop({ trim: true })
  GitHub: string;

  @Prop({ trim: true, required: true })
  about: string;

  @Prop({ trim: true })
  priorAchievements: string;

  @Prop({ default: false })
  isHired: boolean;
}

export const HiringSchema = SchemaFactory.createForClass(Hiring);

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
  prior_achievements list(string)
*/
