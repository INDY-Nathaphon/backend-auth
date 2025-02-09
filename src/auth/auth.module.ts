import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtAuthService } from './jwt/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [JwtModule.register({ secret: 'your-secret-key' }), UsersModule],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthService],
})
export class AuthModule {}
