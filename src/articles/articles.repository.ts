import { Document, Filter, ObjectId } from 'mongodb';
import { Injectable } from '@nestjs/common';

import { DbRepository } from '../db/db.repository';
import { IArticle } from './interfaces/article.interface';
import { ArticlesQueryDto, OrderEnum } from './dtos/articles-query.dto';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class ArticlesRepository extends DbRepository<IArticle> {
  constructor(private usersRepository: UsersRepository) {
    super('articles');
  }

  async create(data: IArticle): Promise<IArticle> {
    const result = await this.collection.insertOne(data);

    return this.findById(result.insertedId);
  }

  async delete(id: ObjectId | string): Promise<boolean> {
    const _id = this.getObjectId(id);
    const res = await this.collection.deleteOne({ _id });

    return res.deletedCount !== 0;
  }

  async deleteMany(ids: string[]) {
    const _ids = ids.map(this.getObjectId);
    const { deletedCount } = await this.collection.deleteMany({
      _id: { $in: _ids },
    });

    return {
      deletedCount,
    };
  }

  async find(query: ArticlesQueryDto): Promise<IArticle[]> {
    const { take, skip, orderByTitle } = query;
    const filter = this.getFilter(query);

    let cursor = await this.collection.find(filter).project({
      title: 1,
      createdAt: 1,
      updatedAt: 1,
      creator: 1,
    });

    if (orderByTitle) {
      cursor = cursor.sort({ title: orderByTitle === OrderEnum.ASC ? 1 : -1 });
    }

    if (take !== undefined && skip !== undefined) {
      cursor = cursor.skip(skip).limit(take);
    }

    const docs = await cursor.toArray();

    return docs as IArticle[];
  }

  private getFilter(query: ArticlesQueryDto) {
    const { creator, createdToDate, createdFromDate, term } = query;
    const filter: Filter<IArticle> = {};

    if (creator) {
      filter.creator = creator;
    }

    if (createdToDate && createdFromDate) {
      filter.createdAt = {
        $gt: createdFromDate,
        $lt: createdToDate,
      };
    }

    // Requires index "collection.createIndex( { title: "text" } )"
    if (term) {
      filter.$text = {
        $search: term,
        $caseSensitive: false,
      };
    }

    return filter;
  }

  async findById(id: ObjectId | string): Promise<IArticle | null> {
    const _id = this.getObjectId(id);
    const doc = (await this.collection.findOne({ _id })) as IArticle;

    doc.creator = await this.usersRepository.findById(doc.creator as ObjectId);

    return doc || null;
  }

  async update(
    id: ObjectId | string,
    data: Partial<IArticle>,
  ): Promise<IArticle> {
    const _id = this.getObjectId(id);
    const res = await this.collection.updateOne(
      { _id },
      {
        $set: data,
      },
    );

    if (res.modifiedCount === 0) {
      throw new Error('Failed to update article');
    }

    return this.findById(_id);
  }

  async pushToArray(
    id: ObjectId | string,
    arrayKey: string,
    document: Document,
  ) {
    const _id = this.getObjectId(id);
    const res = await this.collection.updateOne(
      { _id },
      {
        $push: {
          [arrayKey]: document,
        },
      },
    );

    if (res.modifiedCount === 0) {
      throw new Error('Failed to update article');
    }

    return this.findById(_id);
  }

  async deleteFromArray(
    id: ObjectId | string,
    arrayKey: keyof IArticle,
    filter: Record<string, any>,
  ) {
    const _id = this.getObjectId(id);
    const res = await this.collection.updateOne(
      { _id },
      {
        $pull: {
          [arrayKey]: filter,
        },
      },
    );

    if (res.modifiedCount === 0) {
      throw new Error('Failed to update article');
    }

    return this.findById(_id);
  }
}
