import { Filter, ObjectId } from 'mongodb';

import { DbRepository } from '../db/db.repository';
import { IArticle } from './interfaces/article.interface';
import { ArticlesQueryDto, OrderEnum } from './dtos/articles-query.dto';

export class ArticlesRepository extends DbRepository<IArticle> {
  constructor() {
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

    return doc || null;
  }

  update(id: ObjectId, data: IArticle): Promise<IArticle> {
    return Promise.resolve(undefined);
  }
}
