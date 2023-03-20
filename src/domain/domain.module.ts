import { Module } from '@nestjs/common';
import { InterfacesModule } from './interfaces/interfaces.module';

@Module({
  imports: [InterfacesModule],
})
export class DomainModule {}
