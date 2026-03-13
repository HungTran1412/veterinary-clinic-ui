import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

@Component({
  selector: 'layout-pro-widget-quick-chat-status',
  standalone: true,
  imports: [CommonModule, NzBadgeModule],
  templateUrl: './quick-chat-status.component.html',
  host: {
    '[class.quick-chat-status]': 'true'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutProWidgetQuickChatStatusComponent {
  @Input() status: 'online' | 'away' | 'busy' | 'offline' = 'online';
}
