import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'layout-pro-header-widget',
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
