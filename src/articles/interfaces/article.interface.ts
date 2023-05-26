import { IUser } from '../../users/interfaces/user.interface';

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
  title: string;
  content: string;
  bannerImg: string;
  createdAt: string;
  updatedAt: string;
  creator: IUser;
  comments: IComment[];
  likes: ILike[];
}
