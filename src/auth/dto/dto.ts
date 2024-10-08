import { readFileSync } from 'fs';
import { join } from 'path';

export const privateKey = readFileSync(
  join(__dirname, '../../../src/key/private.pem'),
  'utf8',
);
export const privateRefreshKey = readFileSync(
  join(__dirname, '../../../src/key/private-refresh.pem'),
  'utf8',
);
export const publicKey = readFileSync(
  join(__dirname, '../../../src/key/public.pem'),
  'utf8',
);
