// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtAuthService } from './jwt/jwt.service';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from 'src/dto/register.dto';
import { LoginDto } from 'src/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // Inject UsersService
    private jwtAuthService: JwtAuthService,
  ) {}

  async register(registerDto: RegisterDto): Promise<any> {
    const { username, email, password } = registerDto;
    const existingUser = await this.usersService.findByUsername(username);
    if (existingUser) {
      throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      username,
      email,
      password: hashedPassword,
    });

    const accessToken = this.jwtAuthService.generateAccessToken(user);
    const refreshToken = this.jwtAuthService.generateRefreshToken(user);

    return { accessToken, refreshToken };
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    const accessToken = this.jwtAuthService.generateAccessToken(user);
    const refreshToken = this.jwtAuthService.generateRefreshToken(user);

    return { accessToken, refreshToken };
  }

  async logout(refreshToken: string): Promise<void> {
    await this.usersService.deleteRefreshToken(refreshToken);
  }

  async refreshToken(refreshToken: string): Promise<any> {
    const decoded = await this.jwtAuthService.verifyRefreshToken(refreshToken);
    if (!decoded) {
      throw new Error('Invalid refresh token');
    }
    const user = await this.usersService.findById(decoded.userId);
    if (!user) {
      throw new Error('User not found');
    }
    const accessToken = this.jwtAuthService.generateAccessToken(user);
    return { accessToken };
  }
}
