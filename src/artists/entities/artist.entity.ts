import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @ApiProperty({
    type: String,
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'Linkin Park',
  })
  name: string;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  grammy: boolean;
}
