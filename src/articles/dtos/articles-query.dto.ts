import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Transform } from 'class-transformer';

export enum OrderEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class ArticlesQueryDto {
  @IsString()
  @IsOptional()
  creator?: string;

  @ValidateIf((object) => !!object.createdToDate)
  @Transform(({ value }) => new Date(value))
  @IsDate()
  createdFromDate?: Date;

  @ValidateIf((object) => !!object.createdFromDate)
  @Transform(({ value }) => new Date(value))
  @IsDate()
  createdToDate?: Date;

  @IsString()
  @IsOptional()
  term?: string;

  @ValidateIf((object) => object.take !== undefined)
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  skip?: number;

  @ValidateIf((object) => object.skip !== undefined)
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  take?: number;

  @IsEnum(OrderEnum)
  @IsOptional()
  orderByTitle?: OrderEnum;
}
