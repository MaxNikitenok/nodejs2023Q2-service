import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'In the End',
  })
  name: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true,
  })
  @IsUUID()
  @ValidateIf((_object, value) => value !== null)
  artistId: string | null; // refers to Artist

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true,
  })
  @IsUUID()
  @ValidateIf((_object, value) => value !== null)
  albumId: string | null; // refers to Album

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({
    type: 'integer',
    description: 'In seconds',
  })
  duration: number; // integer number
}
