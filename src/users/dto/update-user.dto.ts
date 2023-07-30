import { IsNotEmpty, IsString } from 'class-validator';
export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string; // previous password
  @IsNotEmpty()
  @IsString()
  newPassword: string; // new password
}
