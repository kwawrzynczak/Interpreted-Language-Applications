import { ForbiddenException, Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';
import { SerializedUser } from './entity/serialized-user';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUsers(user: User) {
    if (user.role !== Role.ADMIN) throw new ForbiddenException();
    const users = await this.prismaService.user.findMany();
    return users;
  }

  getMe(user: User) {
    return new SerializedUser(user);
  }

  async editUser(userId: number, editUserDto: EditUserDto) {
    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: { ...editUserDto },
    });

    return new SerializedUser(user);
  }
}
