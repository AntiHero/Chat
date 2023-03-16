export class CreateUserCommand {
  constructor(
    public readonly usename: string,
    public readonly passwrod: string,
  ) {}
}
