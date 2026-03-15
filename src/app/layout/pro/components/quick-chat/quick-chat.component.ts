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
  _click(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
