import * as R from 'ramda';
import { MessageContent, ChatInfo, IMock } from './index';

class Storage {
  identifier: string;
  storage: 'localStorage' | 'sessionStorage';

  constructor(identifier: string, storage: 'localStorage' | 'sessionStorage') {
    this.identifier = identifier;
    this.storage = storage;
  }

  set(value: any) {
    window[this.storage].setItem(
      this.identifier,
      JSON.stringify(value || null),
    );
  }

  get(): { [key: string]: any } {
    return JSON.parse(window[this.storage].getItem(this.identifier) || '{}');
  }
}

/******************************************************************************/

export let GLOBALS: IMock = {
  config: {
    debug: true,
    timing: {
      initializeAsync: 300,
      getProfile: 300,
      shareDB: 300,
      user: 300,
      chat: 300,
      message: 300,
    },
    storage: 'sessionStorage',
  },

  __wapps__: {
    wappId: 'wapp-id-hash',
    mode: 'main',
  },
  wapps: {},

  __profile__: {},
  profile: {},

  __users__: {},
  user: {
    id: 'user-id',
    firstname: 'firstname',
    username: 'username',
    /* prettier-ignore */
    profileImage: '15-songs-for-your-leadership-playlist_opt.jpg-@-4cdfc053-9a18-4e40-bd49-88f14b40a3a1.jpg',
    getInfo() {
      const that = this;
      // @ts-ignore
      delete that['getInfo'];
      return that;
    },
  },

  __chat__: {},
  __db__: {},
};
/******************************************************************************/

const noop = () => {};
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
let debug = GLOBALS.config.debug ? console.log : noop;
let shareDBStorage = new Storage('share-db', 'sessionStorage');

export const scopeInitiation = () => {
  debug = GLOBALS.config.debug ? console.log : noop;
  shareDBStorage = new Storage('share-db', GLOBALS.config.storage);
  GLOBALS.__db__ = shareDBStorage.get();
};

/******************************************************************************/

export const globalLensView = (path: string[]) => {
  const lens = R.lensPath(path);
  return R.view(lens, GLOBALS);
};

export const globalUpdatePath = (
  path: string[],
  update: Record<string, any>,
) => {
  const lens = R.lensPath(path);
  GLOBALS = R.set(lens, R.mergeDeepLeft(update, globalLensView(path)), GLOBALS);
};

export const setDefaultValueForMissingProps = (mock: Partial<IMock>) => {
  mock = R.mergeDeepLeft(mock, GLOBALS);
  R.forEach(key => globalUpdatePath([key], mock[key]!), R.keys(mock));
};

/******************************************************************************/
const callbacks = {
  // @ts-ignore
  wappWillStart: start => start(),
  onError: () => false,
  // @ts-ignore
  onCustomizationDone: (finalize, customizeObject) => finalize(customizeObject),
};

type CallBack = (...args: any[]) => void;

const setCallback = (key: string) => (callback: CallBack) => {
  // @ts-ignore
  callbacks[key] = (...args: any[]) => {
    debug(`callbacks[${key}]`, ...args);
    callback(...args);
  };
};

export const setHooks = (hooks = {}) => {
  debug('send(wappCommunicateCoreApiInitiated())');
  // @ts-ignore
  Object.entries(hooks).forEach(([name, hook]) => setCallback(name)(hook));
};

/******************************************************************************/
const initializeWapp = async () => {
  debug('request(wappCommunicateCoreInitializeWappData())');
  return GLOBALS.wapps;
};

const initializeUser = async () => {
  debug('request(wappCommunicateCoreGetUserInfo())');
  return GLOBALS.user;
};

export const initializeAsync = async () => {
  await sleep(GLOBALS.config.timing.initializeAsync);
  return await Promise.all([initializeWapp, initializeUser]);
};
/******************************************************************************/

export const getUserMock = () => ({
  getId: () => GLOBALS.user.id,
  getFirstname: () => GLOBALS.user.firstname,
  getLastname: () => GLOBALS.user.lastname,
  getUsername: () => GLOBALS.user.username,
  getProfileImage: () => GLOBALS.user.profileImage,
  getBio: () => GLOBALS.user.bio,
  getInfo: () => GLOBALS.user.getInfo(),
  getProfile: async (section: keyof IMock['profile']) => {
    await sleep(GLOBALS.config.timing.getProfile);
    return GLOBALS.profile[section];
  },
  editProfile: (section: keyof IMock['profile']) => {
    const developerInput = window.prompt(
      'Enter key for your defined role in `__profile_roles__`',
    );

    if (developerInput === null) {
      debug('Role Changed to other, your profile is undefined now');
      return;
    }

    if (R.has(developerInput, GLOBALS.__profile__)) {
      globalUpdatePath(
        ['profile', section],
        GLOBALS.__profile__[developerInput],
      );
      debug(
        `Role Changed to __profile_roles__[${developerInput}], your profile is undefined now`,
      );
      return GLOBALS.__profile__[developerInput];
    } else {
      debug(
        `${developerInput} doesn't exist in __profile_roles__, check for possible typos`,
      );
      return;
    }
  },
});

/******************************************************************************/

const _getUserById = (
  userId: string,
): Omit<IMock['user'], 'getInfo'> | undefined => {
  return R.prop(userId, GLOBALS.__users__);
};

const _getUserByUsername = (
  username: string,
): Omit<IMock['user'], 'getInfo'> | undefined => {
  return R.find(R.propEq('username', username), R.values(GLOBALS.__users__));
};

export const getUsersMock = () => ({
  // TODO: add random user generator
  getById: async (userIds: string[]) => {
    await sleep(GLOBALS.config.timing.user);
    const users: Partial<typeof GLOBALS.__users__> = {};

    R.forEach(userId => {
      const probableUser = _getUserById(userId);
      if (probableUser) users[userId] = probableUser;
      else debug(`[No user exist] userId: ${userId} in your __users__`);
    }, userIds);

    return users;
  },

  getByUsername: async (usernames: string[]) => {
    await sleep(GLOBALS.config.timing.user);
    const users: Partial<typeof GLOBALS.__users__> = {};

    R.forEach(username => {
      const probableUser = _getUserByUsername(username);
      if (probableUser) users[username] = probableUser;
      else debug(`[No user exist] username: ${username} in your __users__`);
    }, usernames);

    return users;
  },

  openProfile: (userId: string) => {
    debug(`Weblite will open the profile of ${userId} if it Exists`);
  },
});

/******************************************************************************/
export const getWappsMock = () => ({
  getWappId: () => GLOBALS.__wapps__.wappId,
  getWisId: () => GLOBALS.__wapps__.wisId,
  getMode: () => GLOBALS.__wapps__.mode,
  start: () => {
    debug('wapp starts!');
  },
  close: () => {
    debug('wapp closes!');
  },
  /** Restart wapp */
  restart: () => {
    debug('wapp re-starts!');
  },
  throwError: (error: string) => {
    debug('wapp throw new Error');
    throw new Error(error);
  },
  setFullscreen: (willBeFullscreen: boolean) => {
    if (willBeFullscreen) {
      GLOBALS.__wapps__.mode = 'fullscreen';
      debug('Set wapp full screen mode');
    }
  },

  changeMode: (mode: IMock['__wapps__']['mode'], input: Object) => {
    GLOBALS.__wapps__.mode = mode;
    GLOBALS.wapps.inputs = input;
    debug(
      `Mode has been change to ${mode} and your given input will be passed to wapp`,
      input,
    );
  },

  setOutput: (output: any) => {
    debug('this output will be passed to the parent wapp.', output);
  },

  donePopup: (output: any) => {
    debug(
      'Closes the popup and resolves the popup mode request in parent wapp by given output.',
      output,
    );
  },

  cancelPopup: () => {
    debug(
      'Closes the popup and rejects the popup mode request in parent wapp.',
    );
  },

  getInput: () => GLOBALS.wapps.inputs,
  getAdmins: () => GLOBALS.wapps.admins,
});

/******************************************************************************/
export const getChatMock = () => ({
  getPublicChatByUsername: async (username: string): Promise<ChatInfo> => {
    await sleep(GLOBALS.config.timing.chat);
    return {
      isMember: null,
      ...R.find(R.propEq('username', username), R.values(GLOBALS.__chat__)),
    };
  },

  getById: async (chatId: string): Promise<ChatInfo> => {
    await sleep(GLOBALS.config.timing.chat);

    return {
      isMember: null,
      ...GLOBALS.__chat__[chatId],
    };
  },

  join: (chatId: string) => {
    debug(`Joins current user in specified chat with chatId="${chatId}"`);
  },
});

/******************************************************************************/
async function sendMessageToAll(
  type: 'text',
  content: string,
  fromUser?: boolean,
): Promise<undefined>;
async function sendMessageToAll(
  type: 'wapp',
  content: MessageContent,
  fromUser?: boolean,
): Promise<string>;
async function sendMessageToAll(type: any, content: any, fromUser: any = true) {
  await sleep(GLOBALS.config.timing.message);

  debug(
    'Sends message to all chats that running wapp exists in and has permission to send message.',
  );
  if (type === 'text') return;
  if (type === 'wapp') return content.wisId;
}

async function sendMessageToCurrentChat(
  type: 'text',
  content: string,
  fromUser?: boolean,
): Promise<undefined>;
async function sendMessageToCurrentChat(
  type: 'wapp',
  content: MessageContent,
  fromUser?: boolean,
): Promise<string>;
async function sendMessageToCurrentChat(
  type: any,
  content: any,
  fromUser: any = true,
) {
  await sleep(GLOBALS.config.timing.message);
  debug('Sends message only to the current chat if user has the permission.');
  if (type === 'text') return;
  if (type === 'wapp') return content.wisId;
}
export const getMessageMock = () => ({
  sendMessageToAll,
  sendMessageToCurrentChat,
});

/******************************************************************************/
export const getAudioMock = () => ({
  play: (src: string) => {
    debug(`Start playing audio with src="${src}"`);
  },
  pause: (src: string) => {
    debug(`Pause audio with src="${src}"`);
  },
  stop: (src: string) => {
    debug(`Stop audio with src="${src}"`);
  },
  setSeek: (src: string, seek: number) => {
    debug(`Seeked the playing audio with src="${src}" to ${seek} position`);
  },
  setVolume: (src: string, volume: number) => {
    debug(`Set the volume of playing audio with src="${src}" to ${volume}`);
  },
});
/******************************************************************************/
export const getAnalyticsMock =
  () => (type: string, data: { [key: string]: string | number }) => {
    debug(`Send analytics event for [${type}] with te following data`, data);
  };
/******************************************************************************/

export const getImageMock = () => ({
  openModal: (options: { src: string; width?: number; height?: number }) => {
    debug(
      `Open Image with the src="${options.src}" the following config will be applied to enhance image`,
    );
  },
});

/******************************************************************************/
let db: Object;
let subscription: (db: IMock['__db__']) => {};
type cbShareDB = (db: IMock['__db__']) => IMock['__db__'];
type Qlite<T extends string> = T | Qlite<T>[];
type Ramda = typeof R;

const parserFunction = (R: Ramda) => {
  const isFunction = (x: Qlite<string>) =>
    x.length && typeof x[0] === 'string' && x[0].startsWith('__');

  function apply(
    f: Ramda[keyof Ramda],
    argsList: Qlite<string>,
    // @ts-ignore
  ): ReturnType<typeof apply> | ReturnType<typeof f> {
    // @ts-ignore
    const appliedFirst = f(...parseList(argsList[0]));
    return argsList.length > 1
      ? apply(appliedFirst, argsList.slice(1))
      : appliedFirst;
  }

  function parseFunction(
    q: [string, Qlite<string>],
    // @ts-ignore
  ): ReturnType<typeof apply> | Ramda[keyof Ramda] {
    const func = R[q[0].slice(2) as keyof Ramda];
    return q.length > 1 ? apply(func, q.slice(1)) : func;
  }

  // (args)
  const parseList: any = R.map(arg => {
    if (R.type(arg) === 'Array')
      return isFunction(arg as Qlite<string>)
        ? parseFunction(arg as [string, Qlite<string>])
        : parseList(arg);
    return arg;
  });

  return parseFunction;
};

const parser = parserFunction(R);

const applySetCall = (func: cbShareDB) => {
  db = func(db);
  subscription(db);
  GLOBALS.__db__ = db;
  shareDBStorage.set(db);
};

const setDispatch = (
  path: string[],
  qlite: [string, Qlite<string>],
  defaultVal: any,
) =>
  applySetCall(
    R.compose(
      R.assocPath(path, R.__, db),
      parser(qlite),
      R.pathOr(defaultVal, path),
    ),
  );

export const getShareDBMock = () => ({
  get: (path: string[] = []) => R.path(path, GLOBALS.__db__),

  getFromServer: async (path: string[] = []) => {
    await sleep(GLOBALS.config.timing.shareDB);
    if (GLOBALS.__wapps__.wisId) return R.path(path, GLOBALS.__db__);
    return false;
  },

  dispatch: (
    path: string[],
    qlite: [string, Qlite<string>],
    defaultVal: any,
    options: any = {},
  ) => {
    setDispatch(path, qlite, defaultVal);
  },

  subscribe: (func: any | cbShareDB) => {
    subscription = func;
  },
});
