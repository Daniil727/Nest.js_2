import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}
  
  create (data: CreateUserDto){
    return this.usersRepository.save(data);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({id});
  }

  update(id: number, data: UpdateUserDto) {
    return this.usersRepository.save({...data, id});
  }

 async remove(id: number) {
    await this.usersRepository.delete({id});
  }
}
