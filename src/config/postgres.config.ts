import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Journal } from 'src/journal/journal.model';
import { ConfigService } from '@nestjs/config';

export function getPostgresSettings(
  configService: ConfigService,
): Promise<SequelizeModuleOptions> {
  return Promise.resolve({
    dialect: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    models: [Journal],
    autoLoadModels: true,
    synchronize: true,
  });
}
