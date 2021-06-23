import { MessageContent, ChatInfo, IMock } from './index';
/******************************************************************************/
export declare let GLOBALS: IMock;
export declare const scopeInitiation: () => void;
/******************************************************************************/
export declare const globalLensView: (path: string[]) => unknown;
export declare const globalUpdatePath: (path: string[], update: Record<string, any>) => void;
export declare const setDefaultValueForMissingProps: (mock: Partial<IMock>) => void;
export declare const setHooks: (hooks?: {}) => void;
export declare const initializeAsync: () => Promise<[() => Promise<{
    inputs?: Record<string, any> | undefined;
    admins?: string[] | undefined;
}>, () => Promise<{
    id: string;
    firstname: string;
    lastname?: string | undefined;
    username: string;
    profileImage?: string | undefined;
    bio?: string | undefined;
    getInfo: () => Omit<any, "getInfo">;
}>]>;
/******************************************************************************/
export declare const getUserMock: () => {
    getId: () => string;
    getFirstname: () => string;
    getLastname: () => string | undefined;
    getUsername: () => string;
    getProfileImage: () => string | undefined;
    getBio: () => string | undefined;
    getInfo: () => Omit<{
        id: string;
        firstname: string;
        lastname?: string | undefined;
        username: string;
        profileImage?: string | undefined;
        bio?: string | undefined;
        getInfo: () => Omit<any, "getInfo">;
    }, "getInfo">;
    getProfile: (section: keyof IMock['profile']) => Promise<{} | undefined>;
    editProfile: (section: keyof IMock['profile']) => any;
};
export declare const getUsersMock: () => {
    getById: (userIds: string[]) => Promise<Partial<Record<string, Omit<{
        id: string;
        firstname: string;
        lastname?: string | undefined;
        username: string;
        profileImage?: string | undefined;
        bio?: string | undefined;
        getInfo: () => Omit<any, "getInfo">;
    }, "getInfo">>>>;
    getByUsername: (usernames: string[]) => Promise<Partial<Record<string, Omit<{
        id: string;
        firstname: string;
        lastname?: string | undefined;
        username: string;
        profileImage?: string | undefined;
        bio?: string | undefined;
        getInfo: () => Omit<any, "getInfo">;
    }, "getInfo">>>>;
    openProfile: (userId: string) => void;
};
/******************************************************************************/
export declare const getWappsMock: () => {
    getWappId: () => string;
    getWisId: () => string | undefined;
    getMode: () => import("./index").RunningWappMode;
    start: () => void;
    close: () => void;
    /** Restart wapp */
    restart: () => void;
    throwError: (error: string) => never;
    setFullscreen: (willBeFullscreen: boolean) => void;
    changeMode: (mode: IMock['__wapps__']['mode'], input: Object) => void;
    setOutput: (output: any) => void;
    donePopup: (output: any) => void;
    cancelPopup: () => void;
    getInput: () => Record<string, any> | undefined;
    getAdmins: () => string[] | undefined;
};
/******************************************************************************/
export declare const getChatMock: () => {
    getPublicChatByUsername: (username: string) => Promise<ChatInfo>;
    getById: (chatId: string) => Promise<ChatInfo>;
    join: (chatId: string) => void;
};
/******************************************************************************/
declare function sendMessageToAll(type: 'text', content: string, fromUser?: boolean): Promise<undefined>;
declare function sendMessageToAll(type: 'wapp', content: MessageContent, fromUser?: boolean): Promise<string>;
declare function sendMessageToCurrentChat(type: 'text', content: string, fromUser?: boolean): Promise<undefined>;
declare function sendMessageToCurrentChat(type: 'wapp', content: MessageContent, fromUser?: boolean): Promise<string>;
export declare const getMessageMock: () => {
    sendMessageToAll: typeof sendMessageToAll;
    sendMessageToCurrentChat: typeof sendMessageToCurrentChat;
};
/******************************************************************************/
export declare const getAudioMock: () => {
    play: (src: string) => void;
    pause: (src: string) => void;
    stop: (src: string) => void;
    setSeek: (src: string, seek: number) => void;
    setVolume: (src: string, volume: number) => void;
};
/******************************************************************************/
export declare const getAnalyticsMock: () => (type: string, data: {
    [key: string]: string | number;
}) => void;
/******************************************************************************/
export declare const getImageMock: () => {
    openModal: (options: {
        src: string;
        width?: number;
        height?: number;
    }) => void;
};
declare type cbShareDB = (db: IMock['__db__']) => IMock['__db__'];
declare type Qlite<T extends string> = T | Qlite<T>[];
export declare const getShareDBMock: () => {
    get: (path?: string[]) => unknown;
    getFromServer: (path?: string[]) => Promise<unknown>;
    dispatch: (path: string[], qlite: [string, Qlite<string>], defaultVal: any, options?: any) => void;
    subscribe: (func: any | cbShareDB) => void;
};
export {};
