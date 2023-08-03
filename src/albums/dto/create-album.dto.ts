import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Hybrid Theory',
  })
  name: string;

  @IsInt()
  @IsPositive()
  @ApiProperty({
    type: 'integer',
    example: 2000,
  })
  year: number;

  artistId: string | null; // refers to Artist
}
