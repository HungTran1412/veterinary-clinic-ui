import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MENU_ITEMS } from '@/app/utils';

/**
 * Dynamically load the start page
 */
export const startPageGuard: CanActivateFn = (_, state): boolean | Observable<boolean> => {
  const router = inject(Router);

  // Logic đơn giản: Nếu URL tồn tại trong danh sách menu thì cho phép truy cập
  // Bạn có thể mở rộng logic này để kiểm tra quyền (ACL) nếu cần

  // Hàm đệ quy để tìm menu item theo URL
  const findMenuItem = (items: any[], url: string): any => {
    for (const item of items) {
      if (item.link === url) return item;
      if (item.children) {
        const found = findMenuItem(item.children, url);
        if (found) return found;
      }
    }
    return null;
  };

  const menu = findMenuItem(MENU_ITEMS, state.url);

  if (!menu) {
    // Nếu không tìm thấy menu tương ứng với URL, chuyển về trang chủ
    router.navigateByUrl('/dashboard');
    return false;
  }

  // Nếu có menu, tạm thời cho phép truy cập (bỏ qua check ACL vì chưa có service ACL)
  return true;
};
