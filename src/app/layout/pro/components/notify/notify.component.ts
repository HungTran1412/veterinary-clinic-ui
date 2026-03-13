import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'layout-pro-widget-notify',
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

  ngOnInit(): void {
    // Logic lấy dữ liệu thông báo sẽ được thêm ở đây
  }

  loadData(): void {
    // Tạm thời để trống
  }

  clear(type: string): void {
    this.msg.success(`Đã xóa hết ${type}`);
  }

  select(item: any): void {
    this.msg.info(`Đã chọn thông báo: ${item.title}`);
  }
}
