import { ApiProperty } from '@nestjs/swagger';

export class Album {
  @ApiProperty({
    type: String,
    format: 'uuid',
  })
  id: string; // uuid v4

  @ApiProperty({
    type: String,
    example: 'Hybrid Theory',
  })
  name: string;

  @ApiProperty({
    type: 'integer',
    example: 2000,
  })
  year: number;

  @ApiProperty({
    type: String,
    nullable: true,
    format: 'uuid',
  })
  artistId: string | null; // refers to Artist
}
