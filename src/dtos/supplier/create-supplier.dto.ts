import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsMongoId,
} from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(150)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(150)
  country: string;

  @IsNotEmpty()
  @IsMongoId()
  createdBy: string;
}
