import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharactersResolver } from './characters.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterEntity } from './character.entity';
import { CharactersService } from './characters.service';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'the-last-of-us-db',
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([CharacterEntity]),
    DomainModule,
  ],
  controllers: [AppController],
  providers: [AppService, CharactersResolver, CharactersService],
})
export class AppModule {}
