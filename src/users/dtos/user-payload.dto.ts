import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserPayloadDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  bio: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}
