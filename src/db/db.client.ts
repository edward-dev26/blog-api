import { MongoClient } from 'mongodb';

export class DbClient {
  private static instance: DbClient;
  private readonly uri = 'mongodb://localhost:27017';
  public client: MongoClient;

  private constructor() {
    this.client = new MongoClient(this.uri);
  }

  static async connect(dbName: string) {
    if (!DbClient.instance) {
      DbClient.instance = new DbClient();
    }

    await DbClient.instance.client.connect();

    return DbClient.instance.client.db(dbName);
  }

  static async connectAdmin() {
    const db = await DbClient.connect('admin');

    return db.admin();
  }
}
