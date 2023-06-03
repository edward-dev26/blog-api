import { ObjectId } from 'mongodb';
import { IUser } from '../../users/interfaces/user.interface';

export interface IComment {
  _id: ObjectId;
  content: string;
  creator: string | ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILike {
  creator: ObjectId | string;
  createdAt: Date;
}

export interface IArticle {
  _id?: ObjectId;
  title: string;
  content: string;
  bannerImg: string;
  createdAt: Date;
  updatedAt: Date;
  creator: ObjectId | string | IUser;
  comments: IComment[];
  likes: ILike[];
}
