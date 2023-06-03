import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { InternalModule } from './internal/internal.module';

@Module({
  imports: [UsersModule, ArticlesModule, InternalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
