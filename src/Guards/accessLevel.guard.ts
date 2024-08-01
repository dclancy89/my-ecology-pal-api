import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessLevel } from '../Decorators/access_level.decorator';
import { ApiKeysService } from 'src/apiKeys/api-keys.service';

@Injectable()
export class AccessLevelGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly apiKeysService: ApiKeysService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const accessLevels = this.reflector.get(AccessLevel, context.getHandler());
    if (!accessLevels) {
      return false;
    }
    const req = context.switchToHttp().getRequest();
    const key = req.headers['X-API-KEY'] ?? req.query.api_key;
    const keyAccessLevel =
      await this.apiKeysService.fetchApiKeyAccessLevel(key);
    return accessLevels.includes(keyAccessLevel);
  }
}
