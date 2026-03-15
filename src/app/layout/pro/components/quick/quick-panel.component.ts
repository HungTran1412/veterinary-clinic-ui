import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BrandService } from '../../pro.service';
import { ProLayout } from '../../pro.types';

@Component({
  selector: 'layout-pro-widget-quick-panel',
  templateUrl: './quick-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutProWidgetQuickPanelComponent implements OnInit {
  status = 0;

  data = {
    settings: {
      new_customer: false,
      reporting_customer: true
    }
  };

  constructor(
    public pro: BrandService,
    public drawerRef: NzDrawerRef,
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  setLayout(name: keyof ProLayout, value: any): void {
    this.pro.setLayout(name, value);
  }

  changeStatus(status: number): void {
    this.status = status;
    this.cdr.detectChanges();
  }

  clear(): void {
    this.msg.success('Đã xóa bộ nhớ đệm');
  }

  updateSetting(key: string, value: boolean): void {
    console.log('Update setting:', key, value);
  }
}
