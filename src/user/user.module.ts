import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Connection, MongoDBConnection, MySQLConnection } from './connection/connection';
import * as process from 'process';

@Module({
  controllers: [UserController],
  providers: [UserService, 
    {
    provide: Connection,
    useClass: process.env.DATABASE == 'mysql' ? MySQLConnection : MongoDBConnection,
   },
  ],
})
export class UserModule {}
