import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharactersResolver } from './characters.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Character} from "./character";
import { CharactersService } from './characters.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'the-last-of-us-db',
      entities: [Character],
    }),
    TypeOrmModule.forFeature([Character]),
  ],
  controllers: [AppController],
  providers: [AppService, CharactersResolver, CharactersService],
})
export class AppModule {}
