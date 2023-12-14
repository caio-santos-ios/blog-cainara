import { Module } from '@nestjs/common';
import { AccountsModule } from './modules/accounts/accounts.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [AccountsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
