import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'layout-pro',
  standalone: true,
  imports: [CommonModule, RouterModule, NzLayoutModule, NzMenuModule, NzIconModule, NzButtonModule],
  template: `
    <nz-layout class="app-layout">
      <nz-sider
        nzCollapsible
        [(nzCollapsed)]="collapsed"
        [nzWidth]="sidebarWidth"
        [nzCollapsedWidth]="collapsedWidth"
        nzTheme="light"
        class="app-sider"
      >
        <div class="logo">VC</div>
        <ul nz-menu nzTheme="light" nzMode="inline" [nzInlineCollapsed]="collapsed">
          <li nz-menu-item>
            <a routerLink="/admin/pet">Thú cưng</a>
          </li>
          <li nz-menu-item>
            <a routerLink="/admin">Dashboard</a>
          </li>
        </ul>
        <div
          class="sider-resize-handle"
          (mousedown)="startResize($event)"
          title="Kéo để thay đổi độ rộng"
        ></div>
      </nz-sider>
      <nz-layout>
        <nz-header class="header">
          <button nz-button nzType="text" nzShape="circle" (click)="toggleCollapsed()">
            <i nz-icon nzType="menu"></i>
          </button>
          <span class="header-title">Veterinary Clinic</span>
        </nz-header>
        <nz-content class="content">
          <router-outlet></router-outlet>
        </nz-content>
      </nz-layout>
    </nz-layout>
  `,
  styles: [
    `
      .app-layout {
        height: 100vh;
      }

      .app-sider {
        position: relative;
        border-right: 1px solid rgba(0, 0, 0, 0.08);
      }

      .logo {
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 16px;
      }

      .header {
        padding: 0 16px;
        background: #fff;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
      }

      .header-title {
        font-size: 18px;
        font-weight: 600;
      }

      .content {
        margin: 24px;
        padding: 24px;
        background: #fff;
        min-height: calc(100vh - 64px);
      }

      .sider-resize-handle {
        position: absolute;
        top: 0;
        right: 0;
        width: 6px;
        height: 100%;
        cursor: ew-resize;
        z-index: 10;
      }
    `
  ]
})
export class LayoutProComponent {
  collapsed = false;
  sidebarWidth = 240;
  collapsedWidth = 72;

  private resizing = false;
  private startX = 0;
  private startWidth = 0;
  private readonly minWidth = 180;
  private readonly maxWidth = 340;

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  startResize(event: MouseEvent): void {
    event.preventDefault();
    this.resizing = true;
    this.startX = event.clientX;
    this.startWidth = this.sidebarWidth;

    const move = (moveEvent: MouseEvent) => {
      if (!this.resizing) {
        return;
      }
      const delta = moveEvent.clientX - this.startX;
      const next = this.startWidth + delta;
      this.sidebarWidth = Math.max(this.minWidth, Math.min(this.maxWidth, next));
    };

    const up = () => {
      this.resizing = false;
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  }
}
