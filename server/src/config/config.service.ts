import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

import { EnvConfig } from './interfaces/envConfig.interface';

@Injectable()
export class ConfigService {
  private readonly filePath: string;
  private readonly envConfig: EnvConfig;

  constructor() {
    this.filePath = process.env.NODE_ENV || '';
    this.envConfig = dotenv.parse(fs.readFileSync(`.env.${this.filePath}`));
  }

  getSetting(key: string): any {
    const variable = this.envConfig[key];

    if (/true|false/.test(variable)) {
      return Boolean(variable);
    }

    if (!Number.isNaN(+variable)) {
      return +variable;
    }

    return this.envConfig[key];
  }
}
