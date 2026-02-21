import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { PrismaService } from './prisma.service.js';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const prismaService = app.get(PrismaService);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map