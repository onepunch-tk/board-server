import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleDestroy() {
    await this.$disconnect();
  }
  async onModuleInit() {
    await this.connectToDatabase();
  }

  private async connectToDatabase(retryCount = 0) {
    try {
      await this.$connect();
    } catch (error) {
      if (retryCount >= 5) {
        process.exit(1);
      }
      await new Promise((resolve) => setTimeout(resolve, 10000)); // 10초 대기
      await this.connectToDatabase(retryCount + 1);
    }
  }
}
