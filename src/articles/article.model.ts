import { ObjectId } from 'mongodb';

import { IArticle, IComment, ILike } from './interfaces/article.interface';
import { CreateArticleDto } from './dtos/create-article.dto';

export class Article implements IArticle {
  bannerImg: string;
  comments: IComment[] = [];
  content: string;
  createdAt: Date;
  creator: ObjectId | string;
  likes: ILike[] = [];
  title: string;
  updatedAt: Date;

  constructor({ title, content, creator, bannerImg }: CreateArticleDto) {
    this.title = title;
    this.content = content;
    this.creator = creator;
    this.bannerImg = bannerImg;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
