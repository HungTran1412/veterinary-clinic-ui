import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { isNullOrEmpty } from '@/app/utils'; // Sử dụng hàm từ utils của dự án

@Component({
  selector: 'layout-pro-widget-user',
  templateUrl: './user.component.html',
  host: {
    '[class.alain-pro__header-item]': 'true'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutProWidgetUserComponent implements OnInit {
  avatar = 'assets/tmp/img/avatar.jpg'; // Ảnh mặc định
  name = 'Admin'; // Tên mặc định

  constructor(
    private router: Router,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    // Logic lấy thông tin user từ service hoặc localStorage sẽ được thêm vào đây
    // Ví dụ:
    // const user = JSON.parse(localStorage.getItem('user') || '{}');
    // this.name = user.name || 'Admin';
  }

  logout(): void {
    // Logic logout đơn giản
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.msg.success('Đăng xuất thành công');
    this.router.navigate(['/passport/login']);
  }
}
