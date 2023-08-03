import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "The user's old password",
  })
  oldPassword: string; // previous password
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "The user's new password",
  })
  newPassword: string; // new password
}
