import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttractionsModule } from './attractions/attractions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [AttractionsModule,TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'nest',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
