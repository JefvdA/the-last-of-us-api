import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { CharactersResolver } from './presentation/resolvers/characters.resolver';
import { PresentationModule } from './presentation/presentation.module';

@Module({
  imports: [DomainModule, InfrastructureModule, PresentationModule],
  controllers: [AppController],
  providers: [AppService, CharactersResolver],
})
export class AppModule {}
