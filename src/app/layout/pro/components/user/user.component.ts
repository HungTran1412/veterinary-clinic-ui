import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'layout-pro-widget-user',
  templateUrl: './user.component.html',
  host: {
    '[class.alain-pro__header-item]': 'true'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutProWidgetUserComponent implements OnInit {
  avatar = 'assets/tmp/img/avatar.jpg';
  name = 'Admin';

  constructor(
    private router: Router,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {}

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.msg.success('Đăng xuất thành công');
    this.router.navigate(['/passport/login']);
  }
}
