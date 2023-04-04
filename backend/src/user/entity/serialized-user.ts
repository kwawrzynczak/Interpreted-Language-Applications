import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class SerializedUser {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @Exclude()
  hash: string;
}
