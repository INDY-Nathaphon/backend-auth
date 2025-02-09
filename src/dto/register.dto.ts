// src/auth/dto/register.dto.ts
import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail() // ใช้สำหรับตรวจสอบว่าเป็นอีเมลที่ถูกต้อง
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail() // ใช้สำหรับตรวจสอบว่าเป็นอีเมลที่ถูกต้อง
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6) // ตรวจสอบว่า password ยาวอย่างน้อย 6 ตัว
  password: string;
}
