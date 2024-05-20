import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthPayloadDto } from "../dto/auth.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('Inside LocalStrategy');
    const authPayload: AuthPayloadDto= { username, password };
    const user = await this.authService.validateUser(authPayload);
    if (!user) throw new UnauthorizedException();
    return user;
  } 
}
