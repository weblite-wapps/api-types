# api-types

typescript interfaces and types for W api object

**Yarn**

```
yarn add @web-lite/api-types --dev
```

**npm**

```
npm install @web-lite/api-types --save-dev
```

**typescript**

```ts
import IWindow from '@web-lite/api-types';

const W = (window as IWindow).W;
```

**javascript**

- **Webstorm**
  Webstorm indexing will find and use the type for W, no additioanl setup is needed

- **VSCode**
  Add a reference to the typed file at heading when you want to use `W` APIs. VSCode will use its [intellisense](https://code.visualstudio.com/docs/editor/intellisense) to suggest docs and auto-complete.

```js
/// <reference path="node_modules/@web-lite/api-types/index.d.ts" />
```

> `Note:` You may need to change the path of `node_modules` directory in workspace-configured projects.

**Note**: You can still use mocks.api

## mock weblite api

```js
import { mockWebliteApi } from '@web-lite/api-types';

mockWebliteApi();
// or
mockWebliteApi({ user: { firstname: 'custom_name', id: 'custom_id' } });
```

```ts
export interface IMock {
  config: {
    debug: boolean;
    timing: {
      initializeAsync: number;
      getProfile: number;
      shareDB: number;
      user: number;
      chat: number;
      message: number;
    };
    storage: 'localStorage' | 'sessionStorage';
  };
  __profile__: Record<string, any>;
  profile: {
    school?: {};
  };

  __users__: Record<string, Omit<IMock['user'], 'getInfo'>>;
  user: {
    id: string;
    firstname: string;
    lastname?: string;
    username: string;
    profileImage?: string;
    bio?: string;
    getInfo: () => Omit<IMock['user'], 'getInfo'>;
  };

  __wapps__: {
    wisId?: string;
    wappId: string;
    mode: RunningWappMode;
  };
  wapps: {
    inputs?: Record<string, any>;
    admins?: string[];
  };

  __chat__: Record<string, ChatInfo>;

  __db__: {};
}
```

This will only set `window.W` in development.
`process.env.NODE_ENV === 'development' && !window.W`
