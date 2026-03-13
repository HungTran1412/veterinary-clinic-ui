import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-test-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div style="border: 3px solid red; padding: 15px; font-family: sans-serif; background-color: #fff;">
      <h1>Test Layout hoạt động!</h1>
      <p>Nếu bạn thấy dòng này, có nghĩa là cấu hình routing cơ bản đã đúng.</p>
      <p>Vấn đề chắc chắn nằm trong LayoutProComponent hoặc các service của nó.</p>
      <div style="border: 2px solid blue; padding: 10px; margin-top: 10px;">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class TestLayoutComponent {}
