import { ObjectId } from 'mongodb';

import { IArticle, IComment, ILike } from '../interfaces/article.interface';
import { CreateArticleDto } from '../dtos/create-article.dto';
import { UpdateArticleDto } from '../dtos/update-article.dto';
import { IUser } from '../../users/interfaces/user.interface';

export class Article implements IArticle {
  title: string;
  content: string;
  bannerImg: string;
  creator: ObjectId | IUser | string;
  createdAt: Date;
  updatedAt: Date;
  comments: IComment[] = [];
  likes: ILike[] = [];

  private constructor({
    title,
    content,
    creator,
    bannerImg,
    createdAt,
    updatedAt,
    comments = [],
    likes = [],
  }: Partial<IArticle>) {
    this.title = title;
    this.content = content;
    this.bannerImg = bannerImg;
    this.creator = creator;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.comments = comments;
    this.likes = likes;
  }

  static create(createDto: CreateArticleDto) {
    return new Article({
      ...createDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static update(article: IArticle, updateDto: UpdateArticleDto) {
    return new Article({
      ...article,
      ...updateDto,
      updatedAt: new Date(),
    });
  }
}
