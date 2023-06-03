import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ArticlesRepository } from './articles.repository';
import { CreateArticleDto } from './dtos/create-article.dto';
import { ArticlesQueryDto } from './dtos/articles-query.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';
import { Article } from './models/article.model';
import { CreateLikeDto } from './dtos/create-like.dto';
import { Like } from './models/like.model';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { Comment } from './models/comment.model';

@Injectable()
export class ArticlesService {
  constructor(private readonly articlesRepository: ArticlesRepository) {}

  find(query: ArticlesQueryDto) {
    return this.articlesRepository.find(query);
  }

  async getById(id: string) {
    const article = await this.articlesRepository.findById(id);

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }

  private async checkArticleIfExists(id: string) {
    await this.getById(id);

    return true;
  }

  create(data: CreateArticleDto) {
    const article = Article.create(data);

    return this.articlesRepository.create(article);
  }

  async createLike(data: CreateLikeDto) {
    const article = await this.getById(data.articleId);
    const isExist = article.likes.some((like) => like.creator === data.userId);

    if (isExist) {
      throw new BadRequestException('Like already exists');
    }

    const like = Like.create(data);

    return this.articlesRepository.pushToArray(article._id, 'likes', like);
  }

  async createComment(data: CreateCommentDto) {
    await this.checkArticleIfExists(data.articleId);

    const comment = Comment.create(data);

    return this.articlesRepository.pushToArray(
      data.articleId,
      'comments',
      comment,
    );
  }

  async update(id: string, data: UpdateArticleDto) {
    const article = await this.getById(id);
    const updatedModel = Article.update(article, data);

    return this.articlesRepository.update(id, updatedModel);
  }

  async delete(id: string) {
    await this.checkArticleIfExists(id);
    return this.articlesRepository.delete(id);
  }

  async deleteMany(ids: string[]) {
    return this.articlesRepository.deleteMany(ids);
  }

  async deleteLike(articleId: string, creator: string) {
    await this.checkArticleIfExists(articleId);

    return this.articlesRepository.deleteFromArray(articleId, 'likes', {
      creator,
    });
  }

  async deleteComment(articleId: string, commentId: string) {
    await this.checkArticleIfExists(articleId);

    return this.articlesRepository.deleteFromArray(articleId, 'comments', {
      _id: this.articlesRepository.getObjectId(commentId),
    });
  }
}
