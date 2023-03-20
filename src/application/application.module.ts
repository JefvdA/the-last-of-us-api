import { Module } from '@nestjs/common';
import { UseCasesModule } from './use-cases/use-cases.module';
import { ServicesModule } from './services/services.module';
import { ArgumentsModule } from './arguments/arguments.module';
import { DtosModule } from './dtos/dtos.module';

@Module({
  imports: [UseCasesModule, ServicesModule, ArgumentsModule, DtosModule],
})
export class ApplicationModule {}
