/////////////////////////
//        IMAGES       //
////////////////////////
interface Images {
  /**
   * Opens specified image in weblite image modal.
   *
   * @date 2021-03-20
   * @param options
   * @property {string} options.src      -  The src url of image (jpg, png, gif, ...) to open
   * @property {number} [options.width]  - The width of image in pixels, it will be clamped by max-width of viewport
   * @property {number} [options.height] - The width of image in pixels, it will be clamped by max-height of viewport
   */
  openModal: (options: {
    src: string;
    width?: number;
    hieght?: number;
  }) => void;
}

/////////////////////////
//        CHATES      //
////////////////////////

interface ChatInfo {
  id?: string;
  description?: string;
  isMember?: boolean;
  name?: string;
  profileImage?: string;
  type?: 'channel' | 'group';
  username?: string;
  /** If requeset chat is private */
  privateChat?: boolean;
}

interface Chats {
  /**
   * Gives public chat info by its username.
   * @date 2021-03-19
   * @param {string} username
   * @returns {promise} chatInto
   */
  getPublicChatByUsername: (username: string) => Promise<ChatInfo>;
  /** Gives info of specified chat by id.
   * @date 2021-03-20
   * @param {string} id
   * @returns {promise} chatInto
   */

  getById: (id: string) => Promise<ChatInfo>;

  /**
   * Joins current user in specified chat (by id).
   * @date 2021-03-20
   * @param {string} chatId - Id of chat you want to join user in.
   */
  join: (id: string) => void;
}

/////////////////////////
//      ANALYTICS      //
////////////////////////
/**
 * sending analytics for wapps
 * @date 2021-03-20
 * @parm {String} type - Type of analytics event.
 * @parm {Object} data - Data of analytics event.
 */
type Analytics = (
  type: string,
  data: { [key: string]: string | number },
) => void;

/////////////////////////
//    AUDIOSYSTEM      //
////////////////////////
interface AudioSystem {
  play: (src: string) => void;
  pause: (src: string) => void;
  stop: (src: string) => void;
  setSeek: (src: string, seek: number) => void;
  setVolume: (src: string, volume: number) => void;
}

/////////////////////////
//        HOOKS        //
////////////////////////

/** @typedef {('inline' | 'popup' | 'drawer' | 'main' | 'fullscreen' | 'customize')} TWappModes */
/** @typedef {{mode: TWappModes}} TRunningWappMode */

type RunningWappMode =
  | 'inline'
  | 'popup'
  | 'drawer'
  | 'main'
  | 'fullscreen'
  | 'customize';
interface RunningWappInfo {
  mode: RunningWappMode;
}

interface Notification {
  /** Id of notification. */
  id: string;
  /** Title of notification.  */
  title: string;
  /** Body text of notification. */
  body: string;
  /** Id of sender wapp instance. */
  wisId: string;
  /** Date of sending this notification. */
  created_at: Date;
}

/** An object containing lifecycle hooks. */
export interface Hooks {
  /**
   * Gets called when wapp is loaded.
   * @date 2021-03-20
   * @param {Fucntion} start - Function to start wapp and remove loading. Just like (W.wapp.start).
   * @param {Fucntion} throwError - Function to throw and error. Just like W.wapp.throwError.
   * @param {TRunningWappMode} info - An object containing mode of running wapp.
   *
   * default behaviour of function is if not presents in hooks will be:
   * start => start()
   */
  wappWillStart?: (
    start: () => void,
    throwError: (error: string) => never,
    info: RunningWappInfo,
  ) => void;

  /**
   * Gets called when wapp is started and weblite loading is removed.
   * @date 2021-03-20
   * @param {TRunningWappMode} [info] - An object containing mode of running wapp.
   */
  wappDidStart?: (info: RunningWappInfo) => void;

  /**
   * Gets called before wapp gets into halt mode.
   * @date 2021-03-20
   * @param {TRunningWappMode} [info] - An object containing mode of running wapp.
   */
  onHalt?: (info: RunningWappInfo) => void;
  /**
   * Gets called when there is a new notification this user and wapp instance.
   * @date 2021-03-20
   * @param {Notification} notification - An object containing new notification info
   */
  onNotif?: (notification: Notification) => void;
  /**
   * Gets called when the wapp’s customization process gets completed and
   * user clicks on the done button in the customize panel.
   * You should call the finalize function passing your new customization object
   * @note you can do nothing and pass given customizationObject too, this will not change anything.
   * @note If you don’t provide this hook, the customization object won’t change and acts like identity function.
   *
   * @date 2021-03-20
   * @param {Function} finalize - An object containing new notification info
   * @param {Object} customizationObject
   */
  onCustomizationDone?: (
    finalize: Function,
    customizationObject: Object,
  ) => void;
}

type SetHooks = (hooks: Hooks) => void;

/**
 * Notice that starred functions need W.initializeAsync() to be resolved (by undefined)
 * before they can be called.
 */
type InitializeAsync = () => Promise<void>;

/////////////////////////
//      ShareDB        //
////////////////////////
//** Under Construction */
type ShareDB = (value: any) => void;

/////////////////////////
//        Wapp         //
////////////////////////
interface Wapp {
  /** Returns wappId of running wapp. */
  getWappId: () => string;
  /** Returns Id of running wapp instance. */
  getWisId: () => string | undefined;
  /**
   * Returns the mode wapp is running in.
   * @returns {TWappModes}
   */
  getMode: () => string;
  /** Removes wapp loading and shows it. */
  start: () => void;
  /** Close wapp. */
  close: () => void;
  /** Restart wapp */
  restart: () => void;
  /**
   * Stops wapp and shows given Error on wapp frame.
   * @date 2021-03-20
   * @param {string} error - error message for Error constructor
   */
  throwError: (error: string) => never;
  /**
   * Enter or exit fullscreen without changing mode or reOpening wapp
   * @date 2021-03-20
   * @param {boolean} willBeFullscreen - Enter or exit fullscreen size.
   */
  setFullscreen: (willBeFullscreen: boolean) => void;
  /**
   * @date 2021-03-20
   * @param {TWappModes} mode - Mode to change to.
   * @param {Object} input - Input to pass to wapp in new mode.
   */
  changeMode: (mode: string, input: Object) => void;

  /**
   * Sets current wapp output. When the user clicks on the done button in popup mode,
   * this output will be passed to the parent wapp.
   *
   * @date 2021-03-20
   * @param {any} Output - Output to set.
   */
  setOutput: (output: any) => void;

  /**
   * When wapp is running in popup mode,
   * Closes the popup and resolves the popup mode request in parent wapp by given output.
   *
   * @date 2021-03-20
   * @param {any} Output - Output to set.
   */
  donePopup: (output: any) => void;

  /**
   * When wapp is running in popup mode,
   * Closes the popup and rejects the popup mode request in parent wapp.
   */
  cancelPopup: () => void;

  /**
   * Returns Running wapp input, also containing instance customization.
   */
  getInput: () => Object;

  /** Returns Array of running wapp admins’ user Ids. */
  getAdmins: () => string[];
}

/////////////////////////
//        User         //
////////////////////////
interface UserInfo {
  id: string;
  username: string;
}

interface UserProfile extends UserInfo {}

interface User {
  /** Returns Id of user. */
  getId: () => string;

  /** Returns username of user. */
  getUsername: () => string;

  /** Returns first name of user. */
  getFirstname: () => string;
  /** Returns string: Last name of user. */
  getLastname: () => string;
  /** Returns URL of user’s profile image. */
  getProfileImage: () => string | undefined;

  /** Returns bio of user. */
  getBio: () => string | undefined;

  /**
   * Returns an Object containing user info (Id, username, ...).
   * @date 2021-03-20
   * @returns UserInfo
   */
  getInfo: () => UserInfo;

  /**
   * @date 2021-03-20
   * @param {string} section - The section of user profile to get.
   * @note If desired section of profile is empty, weblite opens profile and asks user to fill that section.
   * @returns a specific section of user profile (ex: school).
   */
  getProfile: (section: string) => Promise<Partial<UserProfile>>;

  /**
   * Opens a specific section of user’s profile for editing (ex: school) and returns new data.
   * @date 2021-03-20
   * @param {string} section - The section of user profile to open.
   * @note If desired section of profile is empty, weblite opens profile and asks user to fill that section.
   * @returns a new data.
   */
  editProfile: (section: string) => Promise<Partial<UserProfile>>;
}

/////////////////////////
//        Users        //
////////////////////////
interface Users {
  /**
   * Gives info of provided users by userId.
   * @date 2021-03-20
   * @param {string[]} ids - Array of Ids to fetch their user info.
   * @returns users profiles containing fetched user's info normalized on their Ids.
   */
  getById: (ids: string[]) => Promise<Partial<UserProfile>>;

  /**
   * Gives info of provided users by usernames.
   * @date 2021-03-20
   * @param {string[]} usernames - Array of usernames to fetch their user info.
   * @returns users profiles containing fetched user's info normalized on their Usernames.
   * @see getById
   */
  getByUsername: (usernames: string[]) => Promise<Partial<UserProfile>>;
  /**
   * Opens user’s profile page that specified (by id).
   * @date 2021-03-20
   * @param {string} userId - Id of user whom profile page you want to open.
   */
  openProfile: (userId: string) => void;
}

/////////////////////////
//      Messages       //
////////////////////////
/**
 * @date 2021-03-20
 * @typedef {Object} TWappContent
 * @property {string} wappId - WappId of wapp to send
 * @property {string} wisId - Id of instance to send
 * @property {number} width - Widtg of inline wapp message to send
 * @property {number} height - Height of inline wapp message to send
 * @property {Object} customize - If wisId is not provided, will be used to instantiate wapp
 */

type MessageContent = {
  /** WappId of wapp to send */
  wappId: string;
  /** Id of instance to send */
  wisId: string;
  /** Widtg of inline wapp message to send */
  width: number;
  /** Height of inline wapp message to send */
  height: number;
  /** If wisId is not provided, will be used to instantiate wapp */
  customize?: Object;
};

interface Messages {
  /**
   * Sends message to all chats that running wapp exists in and has permission to send message.
   *
   * @date 2021-03-20
   * @param {'text'|'wapp'} type - Type of message to send (text | wapp)
   * @param {string|TWappContent} content - contect of message
   * @param {boolean} [fromUser=true]
   * If true, message will be sent from user.
   * Then wapp will be mentioned like ‘via WappName’ at the footer of the message;
   * Otherwise, message will be sent from wapp without mentioning user.
   *
   * @note When type is ‘wapp’ and width or height are not provided by wapp,
   * weblite will use width and height provided in wapp’s weblite.manifest.json.
   * Every wapp has some required fields in its customization.
   * Those are necessary to be provided by sender wapp; otherwise the message won’t be sent.
   *
   * @returns {promise}
   * If type is ‘wapp’ promise, gets resolved by sent wapp wisId;
   * Otherwise gets resolved by undefined.
   */
  sendMessageToAll(
    type: 'text',
    content: string,
    fromUser?: boolean,
  ): Promise<undefined>;
  sendMessageToAll(
    type: 'wapp',
    content: MessageContent,
    fromUser?: boolean,
  ): Promise<string>;

  /**
   * Sends message only to the current chat if user has the permission.
   *
   * @date 2021-03-20
   * @param {'text'|'wapp'} type - Type of message to send (text | wapp)
   * @param {string|TWappContent} content - contect of message
   * @param {boolean} [fromUser=true]
   * If true, message will be sent from user.
   * Then wapp will be mentioned like ‘via WappName’ at the footer of the message;
   * Otherwise, message will be sent from wapp without mentioning user.
   *
   * @note When type is ‘wapp’ and width or height are not provided by wapp,
   * weblite will use width and height provided in wapp’s weblite.manifest.json.
   * Every wapp has some required fields in its customization.
   * Those are necessary to be provided by sender wapp; otherwise the message won’t be sent.
   *
   * @returns {promise}
   * If type is ‘wapp’ promise, gets resolved by sent wapp wisId;
   * Otherwise gets resolved by undefined.
   */
  sendMessageToCurrentChat(
    type: 'text',
    content: string,
    fromUser?: boolean,
  ): Promise<undefined>;
  sendMessageToCurrentChat(
    type: 'wapp',
    content: MessageContent,
    fromUser?: boolean,
  ): Promise<string>;
}

/////////////////////////
//         W           //
////////////////////////
interface W {
  analytics: Analytics;
  audioSystem: AudioSystem;
  chats: Chats;
  images: Images;
  messages: Messages;
  user: User;
  users: Users;
  wapp: Wapp;

  initializeAsync: InitializeAsync;
  setHooks: SetHooks;
  shareDB: ShareDB;
}

declare global {
  interface Window {
    W: W;
  }
}
export default Window;
