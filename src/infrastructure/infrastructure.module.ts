import { Module } from '@nestjs/common';
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {ApolloServerPluginLandingPageLocalDefault} from "@apollo/server/plugin/landingPage/default";
import {CharactersResolver} from "../characters.resolver";
import {CharactersService} from "../characters.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import { SchemasModule } from './schemas/schemas.module';
import {EntitiesModule} from "./entities/entities.module";

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
        EntitiesModule,
        SchemasModule,
    ],
    providers: [CharactersResolver, CharactersService]
})
export class InfrastructureModule {}
