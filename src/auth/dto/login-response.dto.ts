import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/users.entities';

export class LoginResponseDto {
  @ApiProperty({
    description: 'user validation token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5bGFuQGJvc2Nhcmluby5',
  })
  token: string;

  @ApiProperty({
    description: 'user filled in for login',
  })
  user: User;
}
