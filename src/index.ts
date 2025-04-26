import { registerPlugin } from '@capacitor/core';

import type { LocalAuthPlugin } from './definitions';

const LocalAuth = registerPlugin<LocalAuthPlugin>('LocalAuth', {
  web: () => import('./web').then((m) => new m.LocalAuthWeb()),
});

export * from './definitions';
export { LocalAuth };
