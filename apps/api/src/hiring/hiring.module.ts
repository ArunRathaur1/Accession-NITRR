import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Hiring, HiringSchema } from 'src/schema/hiring.schema';
import { HiringController } from './hiring.controller';
import { HiringService } from './hiring.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Hiring.name,
        schema: HiringSchema,
      },
    ]),
  ],
  controllers: [HiringController],
  providers: [HiringService],
  exports: [HiringService],
})
export class HiringModule {}
