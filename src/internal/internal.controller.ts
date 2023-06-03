import { Controller, Get, Param } from '@nestjs/common';

import { InternalService } from './internal.service';

@Controller('internal')
export class InternalController {
  constructor(private internalService: InternalService) {}

  @Get('dbs')
  getDatabases() {
    return this.internalService.getDatabases();
  }

  @Get('collections/:db')
  getCollections(@Param('db') db: string) {
    return this.internalService.getCollections(db);
  }

  @Get('documents/:db/:collection')
  getDocuments(
    @Param('db') db: string,
    @Param('collection') collection: string,
  ) {
    return this.internalService.getDocuments(db, collection);
  }
}
