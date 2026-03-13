import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'layout-pro-widget-notify',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    NzBadgeModule,
    NzPopoverModule,
    NzTabsModule,
    NzListModule,
    NzSpinModule
  ],
  templateUrl: './notify.component.html',
  host: {
    '[class.alain-pro__header-item]': 'true'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutProWidgetNotifyComponent implements OnInit {
  data: any[] = [];
  loading = false;

  get count(): number {
    return this.data.reduce((prev, cur) => prev + (cur.list ? cur.list.length : 0), 0);
  }

  constructor(private msg: NzMessageService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  loadData(): void {}

  clear(type: string): void {
    this.msg.success(`Đã xóa hết ${type}`);
  }

  select(item: any): void {
    this.msg.info(`Đã chọn thông báo: ${item.title}`);
  }
}
