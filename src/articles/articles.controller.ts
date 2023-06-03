import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dtos/create-article.dto';
import { DeleteManyDto } from './dtos/delete-many.dto';
import { ArticlesQueryDto } from './dtos/articles-query.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';
import { CreateLikeDto } from './dtos/create-like.dto';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  getArticles(@Query() query: ArticlesQueryDto) {
    return this.articlesService.find(query);
  }

  @Get(':id')
  getArticle(@Param('id') id: string) {
    return this.articlesService.getById(id);
  }

  @Post()
  createArticle(@Body() body: CreateArticleDto) {
    return this.articlesService.create(body);
  }

  @Post('likes')
  createLike(@Body() body: CreateLikeDto) {
    return this.articlesService.createLike(body);
  }

  @Post('comments')
  createComment(@Body() body: CreateCommentDto) {
    return this.articlesService.createComment(body);
  }

  @Put(':id')
  updateArticle(@Param('id') id: string, @Body() body: UpdateArticleDto) {
    return this.articlesService.update(id, body);
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

  @Delete(':articleId/likes/:userId')
  deleteLike(
    @Param('articleId') articleId: string,
    @Param('userId') commentId: string,
  ) {
    return this.articlesService.deleteLike(articleId, commentId);
  }

  @Delete(':articleId/comments/:commentId')
  deleteComment(
    @Param('articleId') articleId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.articlesService.deleteComment(articleId, commentId);
  }
}
