import { v4 as uuidv4 } from 'uuid';

import type { IdGeneratorStrategy } from './id-generator.strategy';

export class UuidGeneratorStrategy implements IdGeneratorStrategy {
  generateId(): string {
    return uuidv4();
  }
}
