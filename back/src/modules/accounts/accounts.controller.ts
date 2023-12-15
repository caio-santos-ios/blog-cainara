import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Request, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AuthJwtGuard } from '../auth/auth.jwt.guard';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Patch('accountConfirmation/:token')
  confirmationAccount(@Param('token') token: string){
    return this.accountsService.confirmationAccount(token)
  }

  @Get()
  @UseGuards(AuthJwtGuard)
  findAll(@Request() req) {
    return this.accountsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthJwtGuard)
  findOne(@Param('id') id: string, @Request() req) {
    return this.accountsService.findOne(+id, req.user.id, req.user.isAdmin);
  }

  @Patch(':id')
  @UseGuards(AuthJwtGuard)
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto, @Request() req) {
    return this.accountsService.update(+id, updateAccountDto, req.user.id, req.user.isAdmin);
  }

  @Delete(':id')
  @UseGuards(AuthJwtGuard)
  @HttpCode(204)
  remove(@Param('id') id: string, @Request() req) {
    return this.accountsService.remove(+id, req.user.id, req.user.isAdmin);
  }
}
