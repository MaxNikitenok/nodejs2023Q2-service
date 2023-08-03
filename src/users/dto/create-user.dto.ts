import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "The user's login",
  })
  login: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "The user's password",
  })
  password: string;
}
