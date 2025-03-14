import { Injectable, UnauthorizedException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model,Connection, HydratedDocument } from 'mongoose';
import { UserSchema,UserDocument } from './schemas/user.schema';
import { signUpDto } from './schemas/dto/signUpDto';
import { signInDto } from './schemas/dto/signInDto';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';

@Injectable()
export class AuthService {
    constructor( @InjectModel('User') private userModel:Model<UserDocument>,
    @InjectConnection() private connection: Connection,
    private jwtService: JwtService,
    ){}

    async signUp(data:signUpDto):Promise<any>{
        let {email,firstName,password} = data
        

        let hashedPassword = await bcrypt.hash(password, 10);

        let newUser = await this.userModel.create({
            email,
            firstName,
            password:hashedPassword
        })

        newUser.save()

        let token = this.jwtService.sign({id:newUser._id,email,firstName})

        return token

    }

    async signIn(data:signInDto):Promise<string>{
        let {email,password} = data

        let user = await this.userModel.findOne({email:email}).exec();

        if(!user){
            throw new UnauthorizedException('User not found')
        }

        let matching = await bcrypt.compare(password,user.password)

        if(!matching){
            throw new UnauthorizedException('Wrong password')
        }

        let token = this.jwtService.sign({id:user._id, email,firstName:user.firstName,})

        return token
    }

    

}
