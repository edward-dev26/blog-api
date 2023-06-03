import { Db, ObjectId } from 'mongodb';

import { DbClient } from './db.client';

export abstract class DbRepository<Entity> {
  private readonly DB_NAME = 'blog';
  private db: Db;

  constructor(private readonly collectionName: string) {
    this.connect();
  }

  private connect() {
    DbClient.connect(this.DB_NAME)
      .then((db) => {
        this.db = db;
        console.log('Connected to Mongodb');
      })
      .catch(() => {
        console.error('Failed to connect to Mongodb');
      });
  }

  public get collection() {
    return this.db.collection(this.collectionName);
  }

  public getObjectId(id: ObjectId | string) {
    return id instanceof ObjectId ? id : new ObjectId(id);
  }

  public abstract create(data: Entity): Promise<Entity>;

  public abstract find(query?: any): Promise<Entity[]>;

  public abstract findById(id: ObjectId | string): Promise<Entity | null>;

  public abstract update(
    id: ObjectId | string,
    data: Partial<Entity>,
  ): Promise<Entity>;

  public abstract delete(id: ObjectId | string): Promise<boolean>;
}
