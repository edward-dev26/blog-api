import { BadRequestException, Injectable } from '@nestjs/common';
import { ArticlesRepository } from './articles.repository';
import { CreateArticleDto } from './dtos/create-article.dto';
import { Article } from './article.model';
import { ArticlesQueryDto } from './dtos/articles-query.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly articlesRepository: ArticlesRepository) {}

  create(data: CreateArticleDto) {
    const article = new Article(data);

    return this.articlesRepository.create(article);
  }

  find(query: ArticlesQueryDto) {
    return this.articlesRepository.find(query);
  }

  async delete(id: string) {
    const article = await this.articlesRepository.findById(id);

    if (!article) {
      throw new BadRequestException('Article not found');
    }

    return this.articlesRepository.delete(id);
  }

  async deleteMany(ids: string[]) {
    return this.articlesRepository.deleteMany(ids);
  }
}
