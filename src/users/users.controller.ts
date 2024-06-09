import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { User as userEntity } from 'src/users/entities/user.entity';
@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiResponse({ status: 201, description: 'успешно', type: userEntity })
	@ApiResponse({ status: 401, description: 'Неавториован' })
	@Post()
	create(@Body() createUserDto: CreateUserDto): Promise<userEntity> {
		return this.usersService.create(createUserDto);
	}

	@ApiResponse({ status: 201, description: 'успешно', type: userEntity })
	@ApiResponse({ status: 401, description: 'Неавториован' })
	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserDto,
	): Promise<userEntity> {
		return this.usersService.update(+id, updateUserDto);
	}

	@ApiResponse({ status: 201, description: 'успешно', type: userEntity })
	@ApiResponse({ status: 401, description: 'Неавториован' })
	@Delete(':id')
	remove(@Param('id') id: string): Promise<void> {
		return this.usersService.remove(+id);
	}
}
