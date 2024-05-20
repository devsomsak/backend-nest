import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

const fakeUsers = [
{
    id: 1,
    username: 'admin',
    password: 'admin',
    
},
{
    id: 2,
    username: 'user',
    password: '123',
   
},
];

@Injectable()
export class AuthService {
    constructor(private jwtService:JwtService){}


  async validateUser({ username, password }: AuthPayloadDto): Promise<any> {
    // Your logic to validate the user
    const findUser = fakeUsers.find((user)=> user.username === username);
    if(!findUser) return null;
    if(password === findUser.password){
        const { password, ...user} = findUser;
        return this.jwtService.sign(user);
    }
 
}
}

