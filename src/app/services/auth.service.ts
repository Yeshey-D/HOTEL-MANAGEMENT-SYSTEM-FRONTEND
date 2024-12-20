import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoginModel, LoginResponseModel } from '../models/login.model';
import { ApiService } from '../api.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private TOKEN_KEY = 'access_token';
  private REFRESH_TOKEN_KEY = 'refresh_token';

  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Check if in the browser before accessing localStorage
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // Store tokens
  setToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  setRefreshToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
    }
  }

  // Get tokens
  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  getRefreshToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }
    return null;
  }

  // Remove tokens
  removeToken(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  removeRefreshToken(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }
  }

  // Validate token by calling a protected endpoint
  validateToken(): Observable<boolean> {
    const token = this.getToken();
  
    // Improved undefined and empty string checking
    if (!token || token === 'undefined') {
      return of(false);
    }
  
    return this.apiService.get('/users/self', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  // Login method
  login(loginData: LoginModel): Observable<LoginResponseModel> {
    return this.apiService.post<LoginResponseModel>('/auth/login', loginData).pipe(
      map((response: any) => {
        // Assuming the backend returns an object with access_token and refresh_token
        this.setToken(response.data.access_token);
        this.setRefreshToken(response.data.refresh_token);
        return response.data;
      })
    );
  }

  // Logout method
  logout(): Observable<any> {
    return this.apiService.post('/auth/logout', {}).pipe(
      map(() => {
        this.removeToken();
        this.removeRefreshToken();
      })
    );
  }

  // Refresh token method
  refreshToken(): Observable<LoginResponseModel> {
    const refreshToken = this.getRefreshToken();
    
    return this.apiService.post<LoginResponseModel>('/auth/refresh-token', null, {
      headers: {
        'Authorization': `Bearer ${refreshToken}`
      }
    }).pipe(
      map((response: any) => {
        // Assuming the backend returns an object with access_token and refresh_token
        this.setToken(response?.accessToken);
        this.setRefreshToken(response?.refreshToken);
        return response.data;
      })
    );
  }
}
