import { WebPlugin } from '@capacitor/core';

import type { LocalAuthPlugin } from './definitions';

export class LocalAuthWeb extends WebPlugin implements LocalAuthPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
