import type { IdGeneratorStrategy } from '@app/@common/strategies/id-generator.strategy';
import { UuidGeneratorStrategy } from '@app/@common/strategies/uuid-generator.strategy';

export interface User {
  id: string;
  username: string;
  password: string;
}

export class UserEntity implements User {
  public readonly id: string;

  constructor(
    public readonly username: string,
    public readonly password: string,
    private readonly idGenerator: IdGeneratorStrategy = new UuidGeneratorStrategy(),
  ) {
    this.id = this.idGenerator.generateId();
  }
}
