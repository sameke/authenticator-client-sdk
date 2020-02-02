import { HttpClient } from 'aurelia-fetch-client';
import jwt from 'jwt-decode';
import { Constants } from './Constants';
import { IDto } from './IDto';
import { ITokenPayload } from './ITokenPayload';
import { IUserProfile } from './IUserProfile';
import { LoginTheme } from './LoginTheme';

export class Auth {
    private static _httpClient: HttpClient = new HttpClient();

    public static getAuthUrl(clientId: number, responseType: 'code' | 'token', redirectUri: string, state: string, theme: LoginTheme = LoginTheme.LIGHT): string {
        return `${Constants.AUTH_BASE_URL}?client_id=${clientId}&response_type=${responseType}&scope=profile&redirect_uri=${redirectUri}&state=${state}&theme=${theme}`;
    }

    public static async getUserProfile(token: string): Promise<IUserProfile> {
        let url = `${Constants.AUTH_BASE_URL}/api/users/me`;
        let response = await this._httpClient.fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            let responseDto = await response.json() as IDto<IUserProfile>;
            return responseDto.data;
        }
    }

    public static getTokenPayload(token: string): ITokenPayload {
        return jwt(token) as ITokenPayload;
    }
}