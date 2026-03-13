import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { isNullOrEmpty } from '@/app/utils';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { I18nPipe } from '../../i18n.pipe';

@Component({
  selector: 'layout-pro-widget-user',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzDropDownModule,
    NzAvatarModule,
    NzIconModule,
    I18nPipe
  ],
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
