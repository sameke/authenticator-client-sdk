import { IUserProfile } from './IUserProfile';

export class Auth {
    public static getAuthUrl(clientId: number, responseType: 'code' | 'token', redirectUri: string, state: string): string {
        return `https://auth.sameke.com?clientId=${clientId}&response_type=${responseType}&scope=profile&redirect_uri=${redirectUri}&state=${state}`;
    }

    public static getUserProfile(token: string): Promise<IUserProfile> {

    }

    public static validateToken(token: string): Promise<boolean> {

    }

    public static refreshToken(token: string): Promise<string> {

    }
}