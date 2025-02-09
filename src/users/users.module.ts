// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // เชื่อมต่อกับฐานข้อมูล
  providers: [UsersService], // ระบุ UsersService ใน providers
  exports: [UsersService], // ทำให้ UsersService ใช้งานได้จาก module อื่น
})
export class UsersModule {}
