import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { User as userEntity } from 'src/users/entities/user.entity';
@ApiTags('auth')
@ApiBearerAuth()
@Controller()
export class AppController {
	constructor(
		private readonly usersService: UsersService,
		private authService: AuthService,
	) {}

	@ApiResponse({ status: 201, description: 'зарегался', type: userEntity })
	@ApiResponse({ status: 401, description: 'Неавториован' })
	@Post('auth/register')
	register(@Body() createUserDto: CreateUserDto): Promise<userEntity> {
		return this.usersService.register(createUserDto);
	}

	@ApiResponse({ status: 201, description: 'залогинился', type: userEntity })
	@ApiResponse({ status: 401, description: 'Неавториован' })
	@UseGuards(AuthGuard('local'))
	@Post('auth/login')
	async login(@Request() req): Promise<{ access_token: string }> {
		return this.authService.login(req.user);
	}
}
