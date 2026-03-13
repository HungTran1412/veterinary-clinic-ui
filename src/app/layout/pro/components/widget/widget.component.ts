import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'layout-pro-header-widget',
  templateUrl: './widget.component.html',
  host: {
    '[class.alain-pro__header-right]': 'true'
  }
})
export class LayoutProHeaderWidgetComponent implements OnInit {
  // Thay thế logic lấy quyền user bằng dữ liệu mock hoặc service khác
  // Tạm thời coi như user đã đăng nhập
  hasUser = true;

  constructor() {}

  ngOnInit(): void {
    // Logic kiểm tra đăng nhập có thể thêm ở đây
    // const token = localStorage.getItem('token');
    // this.hasUser = !!token;
  }
}
