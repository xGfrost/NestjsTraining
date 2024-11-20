import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Connection, createConnection, MongoDBConnection, MySQLConnection } from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import { UserRepository } from './user-repository/user-repository';
import { MemberService } from './member/member.service';
import * as process from 'process';
// import { createConnection } from 'net';
import { ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  // imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService,
    {
      provide: Connection,
      useFactory: createConnection,
      inject: [ConfigService],
    }, {
      provide: MailService,
      useValue: mailService,
    },
    {
      provide: 'EmailService',
      useExisting: MailService,
    },

    // {
    //   provide: UserRepository,
    //   useFactory: createUserRepository,
    //   inject: [Connection],
    // },
    UserRepository,
    MemberService,
  ],

})
export class UserModule { }
