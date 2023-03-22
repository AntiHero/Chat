import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('secret')
  public secret() {
    return Buffer.from('secret').toString('base64');
  }
}
