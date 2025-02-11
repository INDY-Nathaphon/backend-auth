// src/users/dto/create-user.dto.ts
import { IsString, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { UserRole } from 'src/users/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
