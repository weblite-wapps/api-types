interface IUser {
    id: string;
    firstname: string;
    lastname?: string;
    username: string;
    profileImage?: string;
    bio?: string;
}
export declare const mockWebliteApi: ({ user: input_user }: {
    user: IUser;
}) => void;
export {};
