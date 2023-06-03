import { ObjectId } from 'mongodb';

import { IComment } from '../interfaces/article.interface';
import { CreateCommentDto } from '../dtos/create-comment.dto';

export class Comment implements IComment {
  _id: ObjectId;
  content: string;
  creator: string | ObjectId;
  createdAt: Date;
  updatedAt: Date;

  private constructor({
    _id,
    content,
    creator,
    createdAt,
    updatedAt,
  }: Partial<IComment>) {
    this._id = _id;
    this.content = content;
    this.creator = creator;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create({ creator, content }: CreateCommentDto) {
    return new Comment({
      creator,
      content,
      _id: new ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
