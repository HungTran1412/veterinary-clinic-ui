import { Component } from '@angular/core';

@Component({
  selector: 'app-system',
  template: `
    <div style="padding: 24px;">
      <h1>Hệ thống</h1>
      <p>Chọn mục con bên trái để xem chi tiết.</p>
      <router-outlet></router-outlet>
    </div>
  `
})
export class SystemComponent {}
