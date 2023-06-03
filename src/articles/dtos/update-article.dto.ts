import { IsString, MaxLength } from 'class-validator';

export class UpdateArticleDto {
  @IsString()
  @MaxLength(128)
  title: string;

  @IsString()
  @MaxLength(500)
  content: string;

  @IsString()
  bannerImg: string;
}
