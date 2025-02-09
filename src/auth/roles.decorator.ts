// src/auth/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export type Role = 'customer' | 'admin';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
