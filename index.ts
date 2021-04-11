import IWindow, { Hooks } from '.';
const W = (window as IWindow).W;

interface IUser {
  id: string;
  firstname: string;
  lastname?: string;
  username: string;
  profileImage?: string;
  bio?: string;
}
export const mockWebliteApi = ({ user: input_user }: { user: IUser }) => {
  if (process.env.NODE_ENV === 'development' && !W) {
    const loggerUI = {
      scope:
        'color:#9cc3db;background-color:#3e4a52;padding:2px 5px;border-radius:4px',
      type:
        'color:#171717;background-color:#7cb342;padding:2px 5px;border-radius:4px',
    };
    const logger = (scopeType: string, ...args: any[]) => (...args2: any[]) => {
      const [scope, type] = scopeType.split(':');
      console.log(
        '🌱',
        `%c${scope}`,
        loggerUI.scope,
        type ? `:%c${type}` : '',
        type ? loggerUI.scope : '',
        ...args,
        ...args2,
      );
    };

    (window as any).W = {
      setHooks: ({ wappWillStart, wappDidStart, onHalt, onNotif }: Hooks) => {
        if (wappWillStart)
          wappWillStart(
            logger('wappWillStart:start'),
            // @ts-ignore
            error => new Error(error),
            logger('wappWillStart:info', { mode: 'inline' }),
          );

        if (wappDidStart)
          // @ts-ignore
          wappDidStart(logger('wappDidStart:info', { mode: 'inline' }));

        if (onHalt)
          // @ts-ignore
          onHalt(logger('onHalt:info', { mode: 'inline' }));

        if (onNotif)
          onNotif(
            // @ts-ignore
            logger('onNotif:info', {
              id: 'string',
              title: 'string',
              body: 'string',
              wisId: 'string',
              created_at: 'Date',
            }),
          );
      },

      user: {
        getId: () => input_user.id || '1e234e5678b91234567f8f9c',
        getFirstname: () => input_user.firstname || 'firstname',
        getLastname: () => input_user.lastname || 'lastname',
        getUsername: () => input_user.username || 'username',
        getProfileImage: () =>
          input_user.profileImage || 'https://picsum.photos/200?random=1',
        getBio: () => input_user.bio || 'bio',
        getInfo: () => ({
          id: input_user.id || '1e234e5678b91234567f8f9c',
          username: input_user.username || 'username',
        }),
        getProfile: async (section: string) =>
          logger('user:getProfile', 'userProfile'),
      },

      images: {
        openModal: logger('images:openModal', {
          src: 'string',
          'width?': 'number',
          'hieght?': 'number',
        }),
      },
    };
  }
};
