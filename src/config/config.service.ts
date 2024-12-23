import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    this.envConfig = dotenv.parse(readFileSync('.env'));
    dotenv.config({ path: '.env' });
  }

  get(key: string): string {
    return process.env[key];
  }
}
