import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  artistId: string | null; // refers to Artist
  @ApiProperty()
  albumId: string | null; // refers to Album
  @ApiProperty()
  @IsInt()
  @IsPositive()
  duration: number; // integer number
}
