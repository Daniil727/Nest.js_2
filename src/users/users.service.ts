import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { retry } from 'rxjs';

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async register(data: CreateUserDto){
    const saltOrRounds = 10;
    data.password = await bcrypt.hash(data.password, saltOrRounds);
    return this.usersRepository.save(data)
   }

   async login(data: CreateUserDto){
    const user = await this.usersRepository.findOneBy({email:data.email})
    if(!user){
      return false
    }
    return await bcrypt.compare(data.password, user.password)
   }
  
  create (data: CreateUserDto){
    return this.usersRepository.save(data);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(email: string) {
    return this.usersRepository.findOneBy({email});
  }

  update(id: number, data: UpdateUserDto) {
    return this.usersRepository.save({...data, id});
  }

 async remove(id: number) {
    await this.usersRepository.delete({id});
  }
}
