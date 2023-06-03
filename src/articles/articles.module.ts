import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesRepository } from './articles.repository';
import { ArticlesController } from './articles.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [ArticlesService, ArticlesRepository],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
