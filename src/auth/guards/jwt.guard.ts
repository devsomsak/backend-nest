import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt} from 'passport-jwt'
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
     canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
       console.log('Inside JWT AuthGuard canActivate');
       return super.canActivate(context)
     }
    }