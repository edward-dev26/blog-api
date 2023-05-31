import { IUser } from '../../users/interfaces/user.interface';
import { ObjectId } from 'mongodb';

export interface IComment {
  content: string;
  creator: IUser;
  createdAt: string;
  updatedAt: string;
}

export interface ILike {
  creator: IUser;
  createdAt: string;
}

export interface IArticle {
  _id?: ObjectId;
  title: string;
  content: string;
  bannerImg: string;
  createdAt: Date;
  updatedAt: Date;
  creator: ObjectId | string;
  comments: IComment[];
  likes: ILike[];
}
