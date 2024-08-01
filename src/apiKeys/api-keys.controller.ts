import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { ApiKey } from './api-keys.entity';
import { ApiKeysService } from './api-keys.service';
import { AccessLevel } from 'src/Decorators/access_level.decorator';
import { AccessLevelsEnum } from '../Models/Models';

@Controller('api-keys')
export class ApiKeysController {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  @Get(':key')
  @AccessLevel([AccessLevelsEnum.admin])
  checkForApiKey(@Param('key') key: string): Promise<boolean> {
    return this.apiKeysService.validateApiKey(key);
  }

  @Post('new')
  @AccessLevel([AccessLevelsEnum.admin])
  addApiKey(@Body() apiKeyDto: CreateApiKeyDto): Promise<ApiKey> {
    return this.apiKeysService.addApiKey(apiKeyDto);
  }
}
