import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesRepository } from './articles.repository';
import { ArticlesController } from './articles.controller';

@Module({
  providers: [ArticlesService, ArticlesRepository],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
