import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

import { isNullOrEmpty } from '../../../utils/utils';

export const AuthGuard: CanActivateFn = (_, state): boolean | Observable<boolean> => {
  const router = inject(Router);
  const jwtHelperService = new JwtHelperService();

  // Lấy token từ localStorage (hoặc nơi bạn lưu trữ)
  // Giả sử bạn lưu token với key là 'token' hoặc 'access_token'
  const token = localStorage.getItem('token');

  let isLoggedIn = true;
  if (isNullOrEmpty(token)) {
    isLoggedIn = false;
  } else {
    // Kiểm tra token hết hạn
    if (jwtHelperService.isTokenExpired(token || '', 0)) {
      isLoggedIn = false;
    }
  }

  if (!isLoggedIn) {
    // Lưu URL hiện tại để redirect lại sau khi login thành công
    // localStorage.setItem('redirectUrl', state.url);

    // Chuyển hướng về trang login
    router.navigate(['/passport/login']);
    return false;
  }

  return true;
};
