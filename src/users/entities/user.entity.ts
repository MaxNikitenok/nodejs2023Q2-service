import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class User {
  @ApiProperty({
    type: String,
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'TestUser',
  })
  login: string;

  @ApiProperty({
    type: 'integer',
    example: 1,
  })
  version: number;

  @ApiProperty({
    type: Number,
    example: 1690838626,
  })
  createdAt: number;

  @ApiProperty({
    type: Number,
    example: 1690838626,
  })
  updatedAt: number;

  @Exclude()
  password: string;
}
