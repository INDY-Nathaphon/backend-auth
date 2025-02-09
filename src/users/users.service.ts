// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity'; // Entity ของผู้ใช้
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // ใช้ TypeORM Repository สำหรับการทำงานกับฐานข้อมูล
  ) {}

  // 1. สร้างผู้ใช้ใหม่
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto); // สร้าง entity ใหม่
    return await this.userRepository.save(user); // บันทึกผู้ใช้ใหม่ลงฐานข้อมูล
  }

  // 2. ค้นหาผู้ใช้ตามชื่อผู้ใช้
  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } }); // ค้นหาผู้ใช้โดยชื่อผู้ใช้
  }

  // 3. ค้นหาผู้ใช้ตาม ID
  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } }); // ค้นหาผู้ใช้โดย ID
  }

  // 4. อัปเดตข้อมูลผู้ใช้
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    await this.userRepository.update(id, updateUserDto); // อัปเดตข้อมูลผู้ใช้ในฐานข้อมูล
    return this.findById(id); // คืนค่าผู้ใช้ที่อัปเดตแล้ว
  }

  // 5. ลบ Refresh Token ของผู้ใช้ (ใช้สำหรับ Logout)
  async deleteRefreshToken(refreshToken: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { refreshToken } });
    if (user) {
      user.refreshToken = '';
      await this.userRepository.save(user);
    }
  }
}
