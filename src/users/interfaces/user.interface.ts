import { ObjectId } from 'mongodb';

export interface IUser {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  avatar?: string | null;
}
