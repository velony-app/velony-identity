import { Module } from '@nestjs/common';

import { PgService } from '@identity-infrastructure/persistence/pg/pg.service';

@Module({
  providers: [PgService],
  exports: [PgService],
})
export class PgModule {}
