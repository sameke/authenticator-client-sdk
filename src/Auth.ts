import { HttpClient } from 'aurelia-fetch-client';
import { IDto } from './IDto';
import { IUserProfile } from './IUserProfile';

export class Auth {
    private static _httpClient: HttpClient = new HttpClient();

    public static getAuthUrl(clientId: number, responseType: 'code' | 'token', redirectUri: string, state: string): string {
        return `http://auth.sameke.com?clientId=${clientId}&response_type=${responseType}&scope=profile&redirect_uri=${redirectUri}&state=${state}`;
    }

    public static async getUserProfile(token: string): Promise<IDto<IUserProfile>> {
        let url = `http://auth.sameke.com/api/users/me`;
        let response = await this._httpClient.fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            return response.json();
        }
    }
}