import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { GitUser } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class GitService {
  oAuthUrl = '';
  constructor(private http: HttpClient) {}

  getOauthUrl(): Promise<{ url: string }> {
    return firstValueFrom(
      this.http
        .get<{ url: string }>(`${environment.apiVersion}/git/url`)
        .pipe(tap((v) => (this.oAuthUrl = v?.url)))
    );
  }

  getAccessToken(code: string) {
    return firstValueFrom(
      this.http.post<{ access_token: string }>(
        `${environment.apiVersion}/git/token`,
        {
          code,
        }
      )
    );
  }

  getUserInfo() {
    return firstValueFrom(
      this.http.get<GitUser>(`${environment.apiVersion}/git/user`)
    );
  }

  removeIntegration() {
    return firstValueFrom(
      this.http.delete(`${environment.apiVersion}/git/token`)
    );
  }
}
