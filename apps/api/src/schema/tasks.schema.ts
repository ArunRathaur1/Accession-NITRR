import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Task extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  task: string;

  @Prop({ required: true })
  isDone: boolean;

  @Prop({ required: true, trim: true })
  assignedBy: string; // email of the person assigning the task

  @Prop({ required: true, trim: true, ref: 'User' })
  assignedTo: string; // email of the user the task is assigned to

  @Prop({ trim: true })
  deadline: string;

  @Prop({ type: [String], trim: true })
  remarks: string[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
