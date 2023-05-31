import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dtos/create-article.dto';
import { DeleteManyDto } from './dtos/delete-many.dto';
import { ArticlesQueryDto } from './dtos/articles-query.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  createArticle(@Body() body: CreateArticleDto) {
    return this.articlesService.create(body);
  }

  @Get()
  getArticles(@Query() query: ArticlesQueryDto) {
    return this.articlesService.find(query);
  }

  @Delete('bulk')
  async deleteManyArticles(@Body() body: DeleteManyDto) {
    const result = await this.articlesService.deleteMany(body.ids);

    return { result };
  }

  @Delete(':id')
  async deleteArticles(@Param('id') id: string) {
    const result = await this.articlesService.delete(id);

    return { result };
  }
}
