import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div style="padding: 32px;">
      <h1>Home is rendering correctly ✅</h1>
      <p>If you see this, routing and rendering are working.</p>
    </div>
  `
})
export class HomeComponent {}
