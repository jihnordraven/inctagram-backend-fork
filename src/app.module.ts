import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

import * as process from "process";

import { Common } from "./common";

import { UsersController } from "./users/users.controller";
import { UsersService } from "./users/users.service";
import { AuthModule } from "./auth/auth.module";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { EmailAdapter } from "./auth/email.adapter";

import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { SecurityDevicesRepository } from "./security.devices/security.devices.repository";
import { SecurityDevicesService } from "./security.devices/security.devices.service";
import { SecurityDevicesController } from "./security.devices/security.devices.controller";

import { SAUsersController } from "./users/sa.users.controller";
import { CommandBus, CqrsModule } from "@nestjs/cqrs";


import {TypeOrmModule} from "@nestjs/typeorm";


import { ScheduleModule } from "@nestjs/schedule";
import { UsersRepository } from "./users/users.reposiroty";
import { PrismaClient } from "@prisma/client";
import { TestingService } from "./testing/testing.service";
import { TestingController } from "./testing/testing.controller";
const modules = [AuthModule]

const services = [AppService, UsersService, AuthService,
   JwtService, SecurityDevicesService, PrismaClient, TestingService]

const repositories = [UsersRepository,
   SecurityDevicesRepository]
const useCases = []
const commands = []




const adapters = [EmailAdapter, Common]


@Module({
  imports: [
    CqrsModule,
    JwtModule.register({secret: "123"}),
    ThrottlerModule.forRoot({
    ttl: 10,
    limit: 500,
    }),
    ScheduleModule.forRoot(),

    ConfigModule.forRoot(),
    /*TypeOrmModule.forRoot({
      /!*type: 'postgres',
      host: "lucky.db.elephantsql.com",
      port: 5432,
      username: 'tfaepjvr',
      password: 'pbzw6dDdgwDXKcr5QzUU9qAwZyLdsoHo',
      database: 'tfaepjvr',*!/
      type: 'postgres',
      /!*url : "postgres://laponovsemen:jb5zyBeHskM2@ep-floral-block-080205-pooler.eu-central-1.aws.neon.tech/neondb",
      ssl : true,*!/
      host: "localhost",
      port: 5432,
      username: 'postgres',
      password: '2233',
      database: 'postgres',
      entities: [Blog, User, BlogBan, APIComment, APILike, APISession, APIPost, BloggerBansForSpecificBlog,
        APIQuizQuestion, APIQuizQuestionAnswer, PairGameQuiz],
      autoLoadEntities: true,
      synchronize: true,
    }),*/
  ],

  controllers: [AppController,SAUsersController, UsersController, AuthController,  SecurityDevicesController, TestingController],

  providers: [...modules,
    ...services,
    ...repositories,
    ...useCases,
    ...commands,
    ...adapters,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }]
})


export class AppModule {
}

