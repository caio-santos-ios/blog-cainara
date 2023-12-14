import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/database/prismaService';
import { compare } from 'bcrypt';
import { sign } from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService){}

  async login(createAuthDto: CreateAuthDto) {
    const account = await this.prisma.account.findUnique({
      where: { email: createAuthDto.email }
    }) 

    if(!account) throw new ConflictException("Email ou senha incorretos")

    const password = await compare(createAuthDto.password, account.password)

    if(!password) throw new ConflictException("Email ou senha incorretos")
 
    return {
      token: this.jwtService.sign({ email: account.email, isAdmin: account.isAdmin }, { subject: String(account.id) }),
      id: account.id
    }
  }
}
