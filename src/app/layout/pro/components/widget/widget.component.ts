import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutProWidgetUserComponent } from '../user/user.component';
import { LayoutProWidgetNotifyComponent } from '../notify/notify.component';
import { LayoutProWidgetQuickChatComponent } from '../quick-chat/quick-chat.component';

@Component({
  selector: 'layout-pro-header-widget',
  standalone: true,
  imports: [
    CommonModule,
    LayoutProWidgetUserComponent,
    LayoutProWidgetNotifyComponent,
    LayoutProWidgetQuickChatComponent
  ],
  templateUrl: './widget.component.html',
  host: {
    '[class.alain-pro__header-right]': 'true'
  }
})
export class LayoutProHeaderWidgetComponent implements OnInit {
  hasUser = true;

  constructor() {}

  ngOnInit(): void {}
}
