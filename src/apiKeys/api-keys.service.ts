import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { ApiKey } from './api-keys.entity';
import { AccessLevelsEnum } from 'src/Models/Models';

const apiKeyLength = 20;

function generateApiKey() {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < apiKeyLength) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

@Injectable()
export class ApiKeysService {
  constructor(
    @InjectRepository(ApiKey)
    private readonly apiKeysRepository: Repository<ApiKey>,
  ) {}

  async addApiKey(apiKeyDto: CreateApiKeyDto): Promise<ApiKey> {
    const apiKey = new ApiKey();
    apiKey.name = apiKeyDto.name;
    apiKey.key = generateApiKey();
    return this.apiKeysRepository.save(apiKey);
  }

  async validateApiKey(key: string): Promise<boolean> {
    console.log(key);
    const apiKey = await this.apiKeysRepository.find({
      where: [
        {
          key: key,
        },
      ],
    });
    console.log(apiKey);
    return apiKey.length > 0 ? true : false;
  }

  async fetchApiKeyAccessLevel(key: string): Promise<AccessLevelsEnum> {
    const apiKey = await this.apiKeysRepository.findOneBy({ key: key });
    return apiKey?.accessLevel;
  }
}
