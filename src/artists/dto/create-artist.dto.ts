import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Linkin Park',
  })
  name: string;

  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  grammy: boolean;
}
