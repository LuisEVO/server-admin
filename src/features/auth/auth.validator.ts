import { IsString, IsEmail } from 'class-validator';

export class AuthTokenValidator {
  @IsEmail()
  email!: string;
  @IsString()
  password!: string;
}

export class AuthRefreshTokeValidator {
  @IsString()
  refresh!: string;
}
