import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { PostUserRequest } from 'src/controllers/user/post-user.request';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const reqBody = new PostUserRequest(email, password);
    const { status, user } = await this.authService.validateUser(reqBody);

    if (!user || !status) {
      throw new UnauthorizedException('Wrong password');
    }

    //pass to deserializeUser
    return user;
  }
}
