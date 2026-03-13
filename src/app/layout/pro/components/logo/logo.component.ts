import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'layout-pro-logo',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './logo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutProLogoComponent {
  get name(): string {
    return this.setting.app.name!;
  }

  constructor(private setting: SettingsService) {}
}
