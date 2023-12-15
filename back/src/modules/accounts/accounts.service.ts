import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/database/prismaService';
import { randomUUID } from 'crypto';
import { Account } from './entities/account.entity';
import { hash } from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { MailService } from './utils/mail.service';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService, private mail: MailService){}

  async create(createAccountDto: CreateAccountDto) {
    const findAccount = await this.prisma.account.findUnique({
      where: { email: createAccountDto.email }
    })

    if(findAccount) throw new ConflictException("Email inválido")

    const token = randomUUID()

    const instance = new Account(token)

    const conf = this.mail.templateConfirmationAccount(createAccountDto.email, createAccountDto.name, token)

    Object.assign(instance, {...createAccountDto, token})
   
    const passord = await hash(createAccountDto.password, 10)
    createAccountDto.password = passord

    
    const account = await this.prisma.account.create({
      data: {...createAccountDto, token}
    })

    await this.mail.sendEmail(conf)
    
    return plainToInstance(Account, account);
  }

  async confirmationAccount(token: string){
    const findAccount = await this.prisma.account.findFirst({
      where: { token }
    })

    if(!findAccount) throw new ConflictException("token inválido")

    await this.prisma.account.update({
      where: { id: findAccount.id },
      data: { isValidated: true, token: "" }
    })

    return "Conta confirmada"
  }

  async findAll() {
    const accounts = await this.prisma.account.findMany()

    return plainToInstance(Account, accounts);
  }

  async findOne(id: number) {
    const findAccount = await this.prisma.account.findUnique({
      where: { id }
    })

    if(!findAccount) throw new NotFoundException("Conta não exite")

    return plainToInstance(Account, findAccount);
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const findAccount = await this.prisma.account.findUnique({
      where: { id }
    })

    if(!findAccount) throw new NotFoundException("Conta não exite")

    const accountUpdate = this.prisma.account.update({
      where: { id },
      data: { ...updateAccountDto }
    })

    return plainToInstance(Account, accountUpdate);
  }

  async remove(id: number) {
    const findAccount = await this.prisma.account.findUnique({
      where: { id }
    })

    if(!findAccount) throw new NotFoundException("Conta não exite")

    await this.prisma.account.delete({
      where: { id }
    })

    return;
  } 
}
