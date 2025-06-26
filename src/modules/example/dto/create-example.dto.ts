import {
  IsString,
  IsOptional,
  IsBoolean,
  Length,
  IsInt,
  Min,
  Max,
} from 'class-validator';

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

  @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  priority?: number;
}
