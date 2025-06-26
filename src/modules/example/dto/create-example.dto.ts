import { IsString, IsOptional, IsBoolean, Length } from 'class-validator';

export class CreateExampleDto {
  @IsString()
  @Length(1, 100)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
