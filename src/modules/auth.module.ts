import { Module } from '@nestjs/common';
import { AuthController } from 'src/controllers';
import { AuthService } from 'src/services/auth.service';
import { LocalStrategy } from 'src/utils/local.strategy';
import { SessionSerializer } from 'src/utils/session.serializer';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [LocalStrategy, AuthService, SessionSerializer],
})
export class AuthModule {}
