import { Controller ,Post,Body, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './schemas/dto/signInDto';
import { signUpDto } from './schemas/dto/signUpDto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/users')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Post('signup')
    async signUp(@Body() data:signUpDto):Promise<string>{
        return this.authService.signUp(data)
    }

    @Post('signin')
    async signIn(@Body() data:signInDto):Promise<string>{
        return this.authService.signIn(data)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async protected(){
        return {
            response:'Protected by JWT'
        }
    }
}
