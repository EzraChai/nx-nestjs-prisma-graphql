import { Injectable } from '@nestjs/common';
import { DbService } from '@full-stack/data-access-db';
import { ID } from '@nestjs/graphql';
import {
  UserCreateInput,
  UserUpdateInput,
} from '@full-stack/generated/qr-db-types';

@Injectable()
export class UserService {
  constructor(private readonly db: DbService) {}

  create(userCreateInput: UserCreateInput) {
    return this.db.user.create({ data: userCreateInput });
  }

  findAll() {
    return this.db.user.findMany();
  }

  findOne(id: number) {
    return this.db.user.findFirst({
      where: {
        id,
      },
    });
  }

  update(id: number, updateUserInput: UserUpdateInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.db.user.delete({
      where: {
        id,
      },
    });
  }
}
