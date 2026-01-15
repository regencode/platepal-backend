import { Exclude } from 'class-transformer';

enum Role {
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER"
}

export class ProfileEntity {
  id!: number;
  email!: string;
  name!: string;
  role!: Role;
  createdAt!: Date;

  @Exclude()
  password!: string;
  @Exclude()
  refreshToken?: string | undefined;

  constructor(partial: Partial<ProfileEntity>) {
    Object.assign(this, partial);
  }
}

