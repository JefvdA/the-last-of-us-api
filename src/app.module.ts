import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { PresentationModule } from './presentation/presentation.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [DomainModule, InfrastructureModule, PresentationModule, ApplicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
