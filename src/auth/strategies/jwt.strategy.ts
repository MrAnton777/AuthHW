import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import * as dotenv from 'dotenv'

dotenv.config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService:AuthService) {
    const key = process.env.SECRET
    if (!key){
      throw new Error('Secret key not found')
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:key,
    });
  }

  async validate(payload:any) {      

      return {id:payload.id,firstName:payload.firstName,email:payload.email}

  }


}