import { ObjectId } from 'mongodb';

import { ILike } from '../interfaces/article.interface';
import { CreateLikeDto } from '../dtos/create-like.dto';

export class Like implements ILike {
  createdAt: Date;
  creator: ObjectId | string;

  private constructor({ creator }: Omit<ILike, 'createdAt'>) {
    this.creator = creator;
    this.createdAt = new Date();
  }

  static create(dto: CreateLikeDto) {
    return new Like({ creator: dto.userId });
  }
}
