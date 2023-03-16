import type { IdGeneratorStrategy } from '@app/strategies/id-generator.strategy';
import { UuidGeneratorStrategy } from '@app/strategies/uuid-generator.strategy';

interface User {
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
    this.idGenerator = idGenerator;
    this.id = this.idGenerator.generateId();
    this.username = username;
    this.password = password;
  }
}
