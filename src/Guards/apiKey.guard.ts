import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { ApiKeysService } from 'src/apiKeys/api-keys.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log(req.headers);
    const key = req.headers['x-api-key'] ?? req.query.api_key;
    console.log(key);
    return this.apiKeysService.validateApiKey(key);
  }
}
