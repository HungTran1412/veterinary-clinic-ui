import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BrandService } from '../../pro.service';
import { ProLayout } from '../../pro.types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'layout-pro-widget-quick-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzIconModule,
    NzSwitchModule,
    NzListModule,
    NzAvatarModule,
    NzButtonModule
  ],
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
