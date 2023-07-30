import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsPositive()
  year: number;

  artistId: string | null; // refers to Artist
}
