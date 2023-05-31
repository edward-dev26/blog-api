import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class DeleteManyDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString({ each: true })
  ids: string[];
}
