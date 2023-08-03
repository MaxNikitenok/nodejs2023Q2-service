import { ApiProperty } from '@nestjs/swagger';

export class Track {
  @ApiProperty({
    type: String,
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'In the End',
  })
  name: string;

  @ApiProperty({
    type: String,
    nullable: true,
    format: 'uuid',
  })
  artistId: string | null;

  @ApiProperty({
    type: String,
    nullable: true,
    format: 'uuid',
  })
  albumId: string | null;

  @ApiProperty({
    type: 'integer',
    description: 'In seconds',
    example: 218,
  })
  duration: number;
}
