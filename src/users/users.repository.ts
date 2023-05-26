import { ObjectId } from 'mongodb';
import { Injectable } from '@nestjs/common';

import { DbRepository } from '../db/db.repository';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersRepository extends DbRepository<IUser> {
  constructor() {
    super('users');
  }

  async create(data: IUser): Promise<IUser> {
    const res = await this.collection.insertOne(data);

    return this.findById(res.insertedId);
  }

  async update(id: string | ObjectId, data: IUser): Promise<IUser> {
    const _id = this.getObjectId(id);

    await this.collection.updateOne({ _id }, { $set: data });

    return this.findById(id);
  }

  async findById(id: ObjectId | string): Promise<IUser> {
    const _id = this.getObjectId(id);
    const doc = await this.collection.findOne({ _id });

    return doc as IUser;
  }

  async find() {
    const docs = await this.collection.find();
    const users = await docs.toArray();

    return users as IUser[];
  }

  async delete(id: ObjectId | string) {
    const _id = this.getObjectId(id);
    const res = await this.collection.deleteOne({ _id });

    return res.acknowledged;
  }
}
