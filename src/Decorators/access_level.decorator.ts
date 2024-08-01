import { Reflector } from '@nestjs/core';

export const AccessLevel = Reflector.createDecorator<string[]>();
