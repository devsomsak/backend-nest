import { Controller, HttpException, UseGuards } from '@nestjs/common';
import { Body, Post, Get, Req } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard'
import { LocalGuard } from './guards/local.guard';

declare module 'express' {
  interface Request {
    user?: any;
  }
}



@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService){}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Body() authPayload:AuthPayloadDto){
    // req.user
    const user = this.authService.validateUser(authPayload);
    if(!user) throw new HttpException('Invalid Credentials', 401);
    return user;
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request){
    console.log('Inside AuthController status method')
    console.log(req.user);
    return req.user
  }

}
