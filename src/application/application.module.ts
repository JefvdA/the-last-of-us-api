import { Module } from '@nestjs/common';
import { UseCasesModule } from './use-cases/use-cases.module';
import {ServicesModule} from "./services/services.module";

@Module({
  imports: [UseCasesModule, ServicesModule],
})
export class ApplicationModule {}
