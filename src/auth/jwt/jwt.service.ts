// src/auth/jwt/jwt.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  generateAccessToken(user: User): string {
    const payload = {
      userId: user.id,
      username: user.username,
      role: user.role,
    };
    return this.jwtService.sign(payload, { expiresIn: '15m' });
  }

  generateRefreshToken(user: User): string {
    const payload = {
      userId: user.id,
      username: user.username,
      role: user.role,
    };
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }

  verifyRefreshToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new Error('Invalid refresh token' + error.message);
    }
  }
}
