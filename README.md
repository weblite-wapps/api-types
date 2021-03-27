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

- webstorm
  Webstorm indexing will find and use the type for W, no additioanl setup is needed

- vscode
  Add a reference to the typed file at heading when you want to use `W` APIs. VSCode will use its [intellisense](https://code.visualstudio.com/docs/editor/intellisense) to suggest docs and auto-complete.

```js
/// <reference path="node_modules/@web-lite/api-types/index.d.ts" />
```

> `Note:` You may need to change the path of `node_modules` directory in workspace-configured projects.

**Note**: You can still use mocks.api
