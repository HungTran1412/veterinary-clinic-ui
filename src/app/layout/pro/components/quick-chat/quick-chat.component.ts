import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'layout-pro-widget-quick-chat',
  templateUrl: './quick-chat.component.html',
  host: {
    '[class.alain-pro__header-item]': 'true',
    '[class.quick-chat]': 'true',
    '[class.quick-chat-show]': 'show'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutProWidgetQuickChatComponent implements OnInit, OnDestroy {
  show = false;
  status: 'online' | 'offline' | 'leave' = 'online';

  collapsed = false;
  hasMessage = true;
  inited = true;
  messages: any[] = [
    {
      dir: 'left',
      type: 'text',
      msg: 'Welcome to Veterinary Clinic!',
      mp: 'assets/tmp/img/1.png',
      name: 'System',
      time: '12:01'
    }
  ];
  text = '';

  @ViewChild('ipt', { static: false }) private ipt!: ElementRef<HTMLInputElement>;
  private destroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
    this.cdr.detectChanges();
  }

  close(): void {
    this.show = false;
    this.cdr.detectChanges();
  }

  enterSend(event: Event): void {
    if (!this.text) return;
    this.messages.push({
      dir: 'right',
      type: 'text',
      msg: this.text,
      mp: 'assets/tmp/img/2.png',
      name: 'Me',
      time: 'now'
    });
    this.text = '';
    this.cdr.detectChanges();
  }

  @HostListener('click')
  _click(): void {
    // Chỉ toggle khi click vào icon chat, nhưng HostListener này bắt click trên toàn bộ component
    // Trong template, click vào title mới gọi toggleCollapsed.
    // Logic này có vẻ để handle việc click outside để đóng chat?
    // Nhưng show được set bằng click vào icon chat trên header (nằm ngoài component này nếu component này là popup).
    // Nhưng layout-pro-widget-quick-chat nằm trong header.
    // Logic của show/hide này có vẻ hơi phức tạp nếu không có context đầy đủ.
    // Tạm thời giữ nguyên.
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
