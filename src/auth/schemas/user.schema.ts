import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User{
    @Prop({ required: true })
    public email: string;

    @Prop({ required: true })
    public firstName:string;

    @Prop({ required: true })
    public password:string;
}

export let UserSchema = SchemaFactory.createForClass(User)