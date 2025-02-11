import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  refreshToken: string | null; // เก็บ Refresh Token สำหรับการทำระบบ logout

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER }) // default to customer
  role: UserRole;
}
