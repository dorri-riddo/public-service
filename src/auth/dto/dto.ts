import { readFileSync } from 'fs';
import { join } from 'path';

export const privateKey =
  process.env.NODE_ENV !== 'test'
    ? readFileSync(join(__dirname, '../../../src/key/private.pem'), 'utf8')
    : 'dummy private key';

export const privateRefreshKey =
  process.env.NODE_ENV !== 'test'
    ? readFileSync(
        join(__dirname, '../../../src/key/private-refresh.pem'),
        'utf8',
      )
    : 'dummy private key';

export const publicKey =
  process.env.NODE_ENV !== 'test'
    ? readFileSync(join(__dirname, '../../../src/key/public.pem'), 'utf8')
    : 'dummy private key';
