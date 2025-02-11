import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { UserRole } from 'src/users/user.entity';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
