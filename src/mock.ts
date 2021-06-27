import IWindow, { IMock } from './index';

import {
  setHooks,
  initializeAsync,
  setDefaultValueForMissingProps,
  getUserMock,
  getUsersMock,
  getWappsMock,
  getChatMock,
  getMessageMock,
  getAudioMock,
  getAnalyticsMock,
  getImageMock,
  scopeInitiation,
  getShareDBMock,
} from './core';

const W = (window as IWindow).W;

type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };

export const mockWebliteApi = (mock: DeepPartial<IMock>) => {
  if (process.env.NODE_ENV !== 'development' || W) return;
  setDefaultValueForMissingProps(mock);
  scopeInitiation();
  console.log('send(wappCommunicateCoreLoaded())');

  (window as any).W = {
    setHooks,
    initializeAsync,
    user: getUserMock(),
    users: getUsersMock(),
    wapp: getWappsMock(),
    chats: getChatMock(),
    messages: getMessageMock(),
    audioSystem: getAudioMock(),
    analytics: getAnalyticsMock(),
    images: getImageMock(),
    shareDB: getShareDBMock(),
  } as IWindow['W'];
};
