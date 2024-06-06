import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({
    description: 'пароль',
  })
  password: string;
  @ApiProperty({
    description: 'email',
  })
  email: string;
  @ApiProperty({
    description: 'время регистрации',
  })
  changet_at: Date;
  @ApiProperty({
    description: 'имя пользователя',
  })
  lastName: string;
  @ApiProperty({
    description: 'фамилия пользователя',
  })
  firstName: string;
  @ApiProperty({
    description: 'id пользователя',
  })
  id: number;
}
