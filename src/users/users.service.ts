import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
	) {}

	async register(data: CreateUserDto): Promise<User> {
		const saltOrRounds = 10;
		data.password = await bcrypt.hash(data.password, saltOrRounds);
		return this.usersRepository.save(data);
	}

	async login(data: CreateUserDto): Promise<boolean> {
		const user = await this.usersRepository.findOneBy({ email: data.email });
		if (!user) {
			return false;
		}
		return await bcrypt.compare(data.password, user.password);
	}

	create(data: CreateUserDto): Promise<User> {
		return this.usersRepository.save(data);
	}

	findAll(): Promise<User[]> {
		return this.usersRepository.find();
	}

	findOne(email: string): Promise<User> {
		return this.usersRepository.findOneBy({ email });
	}

	update(id: number, data: UpdateUserDto): Promise<User> {
		return this.usersRepository.save({ ...data, id });
	}

	async remove(id: number): Promise<void> {
		await this.usersRepository.delete({ id });
	}
}
