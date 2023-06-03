import { Injectable } from '@nestjs/common';
import { DbClient } from '../db/db.client';

@Injectable()
export class InternalService {
  async getDatabases() {
    const admin = await DbClient.connectAdmin();
    const dbs = await admin.listDatabases();

    return Object.values(dbs.databases).map((db) => db.name);
  }

  async getCollections(db: string) {
    const client = await DbClient.connect(db);
    const collections = await client.listCollections().toArray();

    return collections.map((collection) => collection.name);
  }

  async getDocuments(db: string, collection: string) {
    const client = await DbClient.connect(db);

    return client.collection(collection).find().toArray();
  }
}
