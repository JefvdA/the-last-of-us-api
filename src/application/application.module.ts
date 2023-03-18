import { Module } from '@nestjs/common';
import { UseCasesModule } from './use-cases/use-cases.module';
import {ServicesModule} from "./services/services.module";
import { ArgumentsModule } from './arguments/arguments.module';

@Module({
  imports: [UseCasesModule, ServicesModule, ArgumentsModule],
})
export class ApplicationModule {}
