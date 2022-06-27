import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppStatus(): string {
    return 'App running 👨‍🚀! Visit http://localhost:3333/docs/ for documentatio';
  }
}
