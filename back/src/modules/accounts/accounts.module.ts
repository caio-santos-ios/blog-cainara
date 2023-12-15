import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { PrismaService } from 'src/database/prismaService';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './utils/mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        auth: {
          user: process.env.SPTM_MAIL,
          pass: process.env.SPTM_PASS
        }
      },
      defaults: {
        from: process.env.SPTM_MAIL
      }      
    })
  ],
  controllers: [AccountsController],
  providers: [AccountsService, PrismaService, MailService],
  exports: [AccountsService]
})
export class AccountsModule {}
